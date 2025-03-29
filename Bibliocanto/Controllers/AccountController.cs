using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Bibliocanto.IServices;
using Bibliocanto.Services;
using Bibliocanto.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthenticate _authentication;
        private readonly IEmailService _emailService;

        public AccountController(IAuthenticate authentication, IConfiguration configuration, IEmailService emailService)
        {
            _authentication = authentication ?? throw new ArgumentNullException(nameof(authentication));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        private ActionResult<UserToken> GenerateToken(LoginModel userInfo)
        {
            var claims = new[]
            {
                new Claim("email", userInfo.Email),
                new Claim("meuToken", "token do usuario"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(12);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
            };
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("ConfirmPassword", "As senhas não conferem");
                return BadRequest(ModelState);
            }

            var result = await _authentication.RegisterUser( model.Email, model.Password);

            if (result)
            {
                // Buscar usuário recém-criado
                var user = await _authentication.FindUserByEmail(model.Email);
                if (user == null)
                {
                    return BadRequest("Erro ao buscar usuário.");
                }

                // Gerar token de confirmação de e-mail
                var token = await _authentication.GenerateEmailConfirmationToken(user);

                // Criar URL de confirmação
                var confirmationLink = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, token }, Request.Scheme);

                // Enviar e-mail com o link de confirmação (implemente no seu serviço de e-mail)
                await _emailService.SendEmailAsync(model.Email, "Confirme seu e-mail", $"Clique no link para confirmar: {confirmationLink}");

                return Ok("Usuário criado com sucesso. Verifique seu e-mail para confirmar a conta. O e-mail de confirmação pode estar na caixa de spam.");
            }
            else
            {
                ModelState.AddModelError("CreateUser", "Registro inválido.");
                return BadRequest(ModelState);
            }

        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
            {
                return BadRequest("Parâmetros inválidos.");
            }

            var user = await _authentication.FindUserById(userId);
            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            var result = await _authentication.ConfirmEmail(user, token);
            if (result)
            {
                return Ok("E-mail confirmado com sucesso.");
            }

            return BadRequest("Falha na confirmação do e-mail.");
        }

        [HttpGet("UserByEmail")]
        public async Task<ActionResult<IdentityUser>> GetByEmail([FromQuery] string email)
        {
            try
            {
                var result = await _authentication.FindByEmail(email);

                if (result == null)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return Ok(result);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("IdUserByEmail")]
        public async Task<ActionResult<IdentityUser>> GetIdByEmail([FromQuery] string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Email não pode estar vazio.");
                }

                var result = await _authentication.FindUserByEmail(email);

                if (result == null)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log da exceção (você pode usar qualquer mecanismo de logging aqui)
                Console.WriteLine(ex.Message); // Melhor usar um logger como ILogger no lugar de Console.

                return StatusCode(500, "Ocorreu um erro interno.");
            }
        }

        [HttpGet("IdUserById")]
        public async Task<ActionResult<IdentityUser>> GetUserById([FromQuery] string idUser)
        {
            try
            {
                if (string.IsNullOrEmpty(idUser))
                {
                    return BadRequest("IdUser não pode estar vazio.");
                }

                var result = await _authentication.FindUserById(idUser);

                if (result == null)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log da exceção (você pode usar qualquer mecanismo de logging aqui)
                Console.WriteLine(ex.Message); // Melhor usar um logger como ILogger no lugar de Console.

                return StatusCode(500, "Ocorreu um erro interno.");
            }
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> Login([FromBody] LoginModel userInfo)
        {
            if (string.IsNullOrEmpty(userInfo.Email) || string.IsNullOrEmpty(userInfo.Password))
            {
                ModelState.AddModelError("LoginUser", "Email e senha são obrigatórios.");
                return BadRequest(ModelState);
            }

            var user = await _authentication.FindUserByEmail(userInfo.Email);
            if (user == null)
            {
                ModelState.AddModelError("LoginUser", "Usuário não encontrado.");
                return BadRequest(ModelState);
            }

            // Verificar se o e-mail está confirmado
            if (!await _authentication.IsEmailConfirmed(user))
            {
                return BadRequest("Confirme seu e-mail antes de fazer login.");
            }

            var result = await _authentication.Authenticate(userInfo.Email, userInfo.Password);
            if (result)
            {
                return GenerateToken(userInfo);
            }

            ModelState.AddModelError("LoginUser", "Login inválido. Verifique suas credenciais.");
            return BadRequest(ModelState);
        }

        [HttpPost("RequestPasswordResetCode")]
        public async Task<IActionResult> RequestPasswordResetCode([FromBody] ViewModels.ForgotPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("O e-mail é obrigatório.");
            }

            var user = await _authentication.FindUserByEmail(request.Email);
            if (user == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            // Gerar um código numérico de 5 dígitos
            var random = new Random();
            var resetCode = random.Next(10000, 99999).ToString();

            // Armazenar o código temporariamente no banco (ou em cache)
            var codeStored = await _authentication.StoreResetCode(user.Email, resetCode);
            if (!codeStored)
            {
                return BadRequest("Erro ao gerar o código.");
            }

            // Enviar o código para o e-mail do usuário
            await _emailService.SendEmailAsync(user.Email, "Código de Redefinição de Senha",
                $"Seu código de redefinição de senha é: {resetCode}. Ele expira em 10 minutos.");

            return Ok("Se o e-mail estiver registrado, um código foi enviado.");
        }

        [HttpPost("ValidateResetCode")]
        public async Task<IActionResult> ValidateResetCode([FromBody] ValidateCodeRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
            {
                return BadRequest("E-mail e código são obrigatórios.");
            }

            var user = await _authentication.FindUserByEmail(request.Email);
            if (user == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            // Validar o código armazenado
            var isValid = await _authentication.ValidateResetCode(user.Email, request.Code);
            if (!isValid)
            {
                return BadRequest("Código inválido ou expirado.");
            }

            return Ok("Código validado com sucesso.");
        }


        [HttpPost("ResetPasswordWithCode")]
        public async Task<IActionResult> ResetPasswordWithCode([FromBody] ViewModels.ResetPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            var user = await _authentication.FindUserByEmail(request.Email);
            if (user == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            // Validar código antes de permitir a redefinição da senha
            var isValid = await _authentication.ValidateResetCode(user.Email, request.Code);
            if (!isValid)
            {
                return BadRequest("Código inválido ou expirado.");
            }

            // Redefinir a senha
            var result = await _authentication.ResetPasswordWithCode(user.Email, request.Code, request.NewPassword);
            if (!result)
            {
                return BadRequest("Erro ao redefinir a senha.");
            }

            return Ok("Senha redefinida com sucesso.");
        }

    }
}
