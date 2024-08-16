using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveEditorasResource
    {
        [Required]
        [MaxLength(150)]
        public string? NomeEditora { get; set; }
    }
}
