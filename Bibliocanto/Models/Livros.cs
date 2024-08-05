using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Livros
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string NomeLivro { get; set;  }
        [Required]
        public int IdAutor { get; set; }
        [Required]
        public int IdGenero { get; set; }
        [StringLength(500)]
        public string CaminhoImagem { get; set; }
        [Required]
        public int IdEditora { get; set; }

    }
}
