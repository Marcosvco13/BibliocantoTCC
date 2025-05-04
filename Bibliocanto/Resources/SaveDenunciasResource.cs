using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveDenunciasResource
    {
        [Required]
        [MaxLength(450)]
        public string IdUser { get; set; }
        public int IdResenha { get; set; }
        public int IdComentario { get; set; }
        [MaxLength(250)]
        public string Descricao { get; set; }
        public DateTime DataDenuncia { get; set; }
    }
}
