using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class AvaliacaoResenha
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Resenhas IdResenha { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public bool Curtida { get; set; }

        public List<Resenhas> Resenhas { get; set; }
    }
}
