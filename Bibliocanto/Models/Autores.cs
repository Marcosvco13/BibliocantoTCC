using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Autores
    {
        public int Id { get; set; }
        public string NomeAutor { get; set; }
        public IList<Livros> Livros { get; set; } = new List<Livros>();

    }
}
