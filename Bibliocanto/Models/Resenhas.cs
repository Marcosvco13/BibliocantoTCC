using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Resenhas
    {
        [Key]
        public int Id { get; set; }
        //[Required]
        //public Livros IdLivros { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        [Required]
        [StringLength(100)]
        public string TituloResenha { get; set; }
        [Required]
        [StringLength(1000)]
        public string Resenha { get; set; }
        public DateTime DataResenha { get; set; }

        //public List<Livros> Livros { get; set; }
    }
}
