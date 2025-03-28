﻿using Bibliocanto.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Bibliocanto.Services
{
    public class AuthenticateService : IAuthenticate
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticateService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
            return user != null; // Retorna true se o usuário foi encontrado, false caso contrário
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
