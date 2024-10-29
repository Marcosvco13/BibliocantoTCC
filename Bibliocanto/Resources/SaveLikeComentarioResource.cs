using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveLikeComentarioResource
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int IdComentario { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public int Like { get; set; }
    }
}
