using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveAvaliacaoResource
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int IdLivro { get; set; }
        [Required]
        [StringLength(450)]
        public string IdUser { get; set; }
        public float? Estrelas { get; set; }
    }
}
