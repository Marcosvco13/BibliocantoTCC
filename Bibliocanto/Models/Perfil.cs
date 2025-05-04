namespace Bibliocanto.Models
{
    public class Perfil
    {
        public int Id { get; set; }
        public string? IdUser { get; set; }
        public string? Nome { get; set; }
        public string? Apelido { get; set; }
        public string? Descricao { get; set; }
        public DateTime? DataNasc { get; set; }
        public string? FotoPerfil { get; set; }
    }
}
