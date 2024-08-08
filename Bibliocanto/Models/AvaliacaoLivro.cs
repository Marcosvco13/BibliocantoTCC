using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class AvaliacaoLivro
    {
        [Key]
        public int Id { get; set; }
        //[Required]
        //public Livros IdLivro { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public int QuantEstrela {  get; set; }

        //public List<Livros> Livros { get; set; }
    }
}
