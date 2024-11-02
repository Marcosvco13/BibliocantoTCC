using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveDeslikeLivrosResource
    {
        public int IdLivro { get; set; }
        [StringLength(450)]
        public string IdUser { get; set; }
        public int Deslike { get; set; }
    }
}
