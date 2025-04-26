using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SavePreferenciasResource
    {
        [Required]
        [MaxLength(450)]
        public string IdUser { get; set; }
        [Required]
        public int IdGenero { get; set; }
    }
}
