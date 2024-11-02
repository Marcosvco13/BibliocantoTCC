namespace Bibliocanto.Models
{
    public class Avaliacao
    {
        public int Id { get; set; }
        public int IdLivro { get; set; }
        public string IdUser { get; set; }
        public float? Estrelas {  get; set; }
    }
}
