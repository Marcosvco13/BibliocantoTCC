namespace Bibliocanto.Models
{
    public class Generos
    {
        public int Id { get; set; }
        public string? NomeGenero { get; set; }
        public IList<Livros> Livros { get; set; } = new List<Livros>();
    }
}
