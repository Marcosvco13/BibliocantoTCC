namespace Bibliocanto.Models
{
    public class LikeLivros
    {
        public int Id { get; set; }
        public int IdLivro { get; set; }
        public string IdUser { get; set; }
        public int Like { get; set; }
    }
}
