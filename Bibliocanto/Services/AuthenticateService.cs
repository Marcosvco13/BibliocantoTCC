using System.Security.Claims;
using Bibliocanto.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Bibliocanto.Services
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly Dictionary<string, string> _resetCodes = new();

        public AuthenticateService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<bool> StoreResetCode(string email, string code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return false;

            // Remover qualquer código antigo antes de salvar um novo
            var existingClaim = (await _userManager.GetClaimsAsync(user))
                .FirstOrDefault(c => c.Type == "ResetCode");

            if (existingClaim != null)
                await _userManager.RemoveClaimAsync(user, existingClaim);

            // Adicionar novo código como claim
            await _userManager.AddClaimAsync(user, new Claim("ResetCode", code));

            return true;
        }

        public async Task<bool> ValidateResetCode(string email, string code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return false;

            var claim = (await _userManager.GetClaimsAsync(user))
                .FirstOrDefault(c => c.Type == "ResetCode");

            return claim != null && claim.Value == code;
        }

        public async Task<string?> GetResetCode(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return null;

            var claim = (await _userManager.GetClaimsAsync(user))
                .FirstOrDefault(c => c.Type == "ResetCode");

            return claim?.Value;
        }

        public async Task<bool> ResetPasswordWithCode(string email, string code, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return false;

            if (!await ValidateResetCode(email, code))
                return false;

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);

            if (result.Succeeded)
            {
                // Remover o código após o uso
                var claim = (await _userManager.GetClaimsAsync(user))
                    .FirstOrDefault(c => c.Type == "ResetCode");
                if (claim != null)
                    await _userManager.RemoveClaimAsync(user, claim);

                return true;
            }

            return false;
        }

        public async Task<bool> Authenticate(string email, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, false, lockoutOnFailure: false);

            return result.Succeeded;
        }

        public async Task<bool> RegisterUser(string email, string password)
        {
            var appUser = new IdentityUser
            {
                UserName = email,
                Email = email
            };

            var result = await _userManager.CreateAsync(appUser, password);

            if(result.Succeeded)
            {
                await _signInManager.SignInAsync(appUser, isPersistent: false);
            }

            return result.Succeeded;
        }

        public async Task<bool> FindByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user != null;
        }

        public async Task<IdentityUser> FindUserByEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public async Task<IdentityUser> FindUserById(string idUser)
        {
            var user = await _userManager.FindByIdAsync(idUser);
            return user;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<string> GenerateEmailConfirmationToken(IdentityUser user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<bool> ConfirmEmail(IdentityUser user, string token)
        {
            var result = await _userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded;
        }

        public async Task<bool> IsEmailConfirmed(IdentityUser user)
        {
            return await _userManager.IsEmailConfirmedAsync(user);
        }
    }
}
