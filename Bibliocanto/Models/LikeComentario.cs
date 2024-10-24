namespace Bibliocanto.Models
{
    public class LikeComentario
    {
        public int Id { get; set; }
        public int IdComentario { get; set; }
        public string IdUser { get; set; }
        public int Like { get; set; }
    }
}
