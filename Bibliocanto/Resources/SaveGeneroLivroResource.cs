using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveGeneroLivroResource
    {
        [Required]
        public int IdLivro { get; set; }
        public int IdGenero { get; set; }
    }
}