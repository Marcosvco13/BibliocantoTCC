using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveLikeResenhaResource
    {
        [Required]
        public int IdResenha { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public int Like { get; set; }
    }
}
