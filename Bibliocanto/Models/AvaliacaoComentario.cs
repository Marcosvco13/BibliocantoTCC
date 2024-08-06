using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class AvaliacaoComentario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public ComentarioResenha IdComentario { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public bool Curtida { get; set; }

        public List<ComentarioResenha> ComentarioResenhas { get; set; }
    }
}
