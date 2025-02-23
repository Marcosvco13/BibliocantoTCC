﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.Services;
using Bibliocanto.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

        public AccountController(IAuthenticate authentication, IConfiguration configuration)
        {
            _authentication = authentication ?? throw new ArgumentNullException(nameof(configuration));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(authentication));
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
                return Ok($"Usuário {model.Email} criado com sucesso");
            }
            else
            {
                ModelState.AddModelError("CreateUser", "Registro inválido " + result);
                return BadRequest(ModelState);
            }

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
                    return BadRequest("Email não pode estar vazio.");
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
            // Validate the user info
            if (userInfo == null || string.IsNullOrEmpty(userInfo.Email) || string.IsNullOrEmpty(userInfo.Password))
            {
                ModelState.AddModelError("LoginUser", "Email e senha são obrigatórios.");
                return BadRequest(ModelState);
            }

            // Authenticate user
            var result = await _authentication.Authenticate(userInfo.Email, userInfo.Password);

            if (result)
            {
                // If authentication is successful, generate and return a token
                return GenerateToken(userInfo);
            }
            else
            {
                // Add an error to the ModelState and return BadRequest in case of failure
                ModelState.AddModelError("LoginUser", "Login inválido. Verifique suas credenciais.");
                return BadRequest(ModelState);
            }
        }
    }
}
