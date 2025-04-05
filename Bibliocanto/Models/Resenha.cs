using Microsoft.AspNetCore.Identity;

namespace Bibliocanto.Models
{
    public class Resenha
    {
        public int Id { get; set; }
        public int IdLivro { get; set; }
        public string IdUser { get; set; }

        public string TextoResenha { get; set; }

        // Propriedade de navegação correta
        public virtual IdentityUser Usuario { get; set; }
    }
}
