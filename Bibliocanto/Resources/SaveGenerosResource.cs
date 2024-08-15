using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveGenerosResource
    {
        [Required]
        [MaxLength(150)]
        public string nomegenero { get; set; }
    }
}
