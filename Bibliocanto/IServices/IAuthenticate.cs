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
    }
}
