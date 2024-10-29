using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveComentariosResource
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int IdResenha { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        [StringLength(450)]
        public string TextoComent { get; set; }
    }
}
