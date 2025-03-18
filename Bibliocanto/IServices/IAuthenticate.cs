using Microsoft.AspNetCore.Identity;

namespace Bibliocanto.IServices
{
    public interface IAuthenticate
    {
        Task<bool> Authenticate(string email, string password);
        Task<bool> RegisterUser(string email, string password);
        Task<bool> FindByEmail(string email);
        Task<IdentityUser> FindUserByEmail(string email);
        Task<IdentityUser> FindUserById(string idUser);
        Task Logout();
        Task<string> GenerateEmailConfirmationToken(IdentityUser user);
        Task<bool> ConfirmEmail(IdentityUser user, string token);
        Task<bool> IsEmailConfirmed(IdentityUser user);
    }
}

