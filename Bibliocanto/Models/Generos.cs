namespace Bibliocanto.Models
{
    public class Generos
    {
        public int id { get; set; }
        public string nomegenero { get; set; }
        public IList<Livros> Livros { get; set; } = new List<Livros>();
    }
}
