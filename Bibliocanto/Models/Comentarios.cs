namespace Bibliocanto.Models
{
    public class Comentarios
    {
        public int Id { get; set; }
        public int IdResenha { get; set; }
        public string IdUser { get; set; }
        public string TextoComent {  get; set; }

    }
}
