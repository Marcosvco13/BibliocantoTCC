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
        Task<bool> StoreResetCode(string email, string code);
        Task<string?> GetResetCode(string email);
        Task<bool> ResetPasswordWithCode(string email, string code, string newPassword);
        Task<bool> ValidateResetCode(string email, string code);

    }
}

