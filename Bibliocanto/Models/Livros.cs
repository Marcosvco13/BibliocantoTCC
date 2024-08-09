using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Livros
    {
        [Key]
        public int Id { get; set; }
        public string ISBN {  get; set; }
        [Required]
        [StringLength(255)]
        public string Titulo { get; set; }
        [Required]
        [StringLength(5000)]
        public string Descricao { get; set; }
        [Required]
        [StringLength(255)]
        public string Editora { get; set; }
        [Required]
        [StringLength(255)]
        public string Genero { get; set; }
        [Required]
        [StringLength(255)]
        public string Autor { get; set; }
        [Required]
        [StringLength(500)]
        public string caminhoImagem { get; set; }

    }
}
