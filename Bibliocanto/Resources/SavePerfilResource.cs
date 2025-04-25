using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SavePerfilResource
    {
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public string Nome { get; set; }
        public string Apelido { get; set; }
        public string Descricao { get; set; }
        public DateTime DataNasc { get; set; }
        public string FotoPerfil { get; set; }
    }
}
