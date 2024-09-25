using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class MeusLivros
    {
        public int Id { get; set; }
        public string IdUser { get; set; }
        public int Lido { get; set; }
        public int Relido { get; set; }

        public int IdLivro { get; set; }
        public Livros Livros { get; set; }

    }
}
