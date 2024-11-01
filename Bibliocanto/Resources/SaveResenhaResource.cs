using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveResenhaResource
    {
        [Required]
        public int IdLivro { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        [StringLength(2000)]
        public string TextoResenha { get; set; }
    }
}
