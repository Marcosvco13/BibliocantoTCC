using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveMeusLivrosResource
    {
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public int Lido { get; set; }
        public int Relido { get; set; }
        [Required]
        public int IdLivro { get; set; }
    }
}
