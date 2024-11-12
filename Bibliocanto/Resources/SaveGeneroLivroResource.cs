using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveGeneroLivroResource
    {
        public int IdLivro { get; set; }
        public int IdGenero { get; set; }
    }
}