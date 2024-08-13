using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveLivrosResource
    {
        [Required]
        [StringLength(155)]
        public string Titulo { get; set; }
        [Required]
        [StringLength(1000)]
        public string Descricao { get; set; }
        [Required]
        public int AutorId { get; set; }

    }
}
