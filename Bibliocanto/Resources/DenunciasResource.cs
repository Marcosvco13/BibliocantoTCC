namespace Bibliocanto.Resources
{
    public class DenunciasResource
    {
        public int Id { get; set; }
        public string IdUser { get; set; }
        public int IdResenha { get; set; }
        public int IdComentario { get; set; }
        public string Descricao { get; set; }
        public DateTime DataDenuncia { get; set; }
    }
}
