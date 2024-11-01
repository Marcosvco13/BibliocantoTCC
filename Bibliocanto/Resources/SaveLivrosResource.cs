using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveLivrosResource
    {
        [StringLength(155)]
        public string Titulo { get; set; }
        [StringLength(1555)]
        public string Descricao { get; set; }
        [StringLength(555)]
        public string CaminhoImagem { get; set; }
        [StringLength(50)]
        public string Isbn { get; set; }
        [StringLength(255)]
        public string LinkCompra {  get; set; }
        public int EditoraId { get; set; }

    }
}
