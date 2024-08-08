using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Estantes
    {
        [Key]
        [StringLength(450)]
        public string IdUser { get; set; }
        [Required]
       // public Livros IdLivro { get; set; }
        //[Required]
        public bool Lido { get; set; }
        public int Relido { get; set; }
        [Required]
        public DateTime DateAdd { get; set; }

       // public List<Livros> Livros { get; set; }   
    }
}