namespace Bibliocanto.Models
{
    public class Editoras
    {
        public int Id { get; set; }
        public string? NomeEditora { get; set; }
        public IList<Livros> Livros { get; set; } = new List<Livros>();
    }
}
