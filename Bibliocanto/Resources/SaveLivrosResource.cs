using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveLivrosResource
    {
        [Required]
        [StringLength(155)]
        public string Titulo { get; set; }
        [Required]
        [StringLength(1555)]
        public string Descricao { get; set; }
        [Required]
        [StringLength(555)]
        public string CaminhoImagem { get; set; }
        [Required]
        [StringLength(50)]
        public string Isbn { get; set; }
        [StringLength(255)]
        public string LinkCompra {  get; set; }
        //[Required]
        //public string Autores { get; set; }
        //public int AutorId { get; set; }
        //[Required]
        //public int GeneroId { get; set; }
        //[Required]
        //public string Editora { get; set; }
        public int EditoraId { get; set; }

    }
}
