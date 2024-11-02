using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Livros
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? CaminhoImagem { get; set; }
        public string? Isbn { get; set; }
        public string? LinkCompra {  get; set; }

        public int EditoraId { get; set; }
        public Editoras? Editoras { get; set; }

        public IList<MeusLivros> MeusLivros { get; set; } = new List<MeusLivros>();

    }
}
