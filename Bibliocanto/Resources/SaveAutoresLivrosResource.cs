using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveAutoresLivrosResource
    {
        [Required]
        public int Id { get; set; }
        public int IdLivro { get; set; }
        public int IdAutor { get; set; }
    }
}
