using System.Data;

namespace Bibliocanto.ViewModels
{
    public class UserToken
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
