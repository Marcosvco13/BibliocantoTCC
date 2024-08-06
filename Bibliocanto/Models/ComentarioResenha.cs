using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class ComentarioResenha
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Resenhas IdResenha { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        [StringLength(500)]
        public string Comentario { get; set; }
        public DateTime DataComentario { get; set; }

        public List<Resenhas> Resenhas { get; set; }
    }
}
