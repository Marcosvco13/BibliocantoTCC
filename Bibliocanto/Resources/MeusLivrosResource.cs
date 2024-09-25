namespace Bibliocanto.Resources
{
    public class MeusLivrosResource
    {
        public int Id { get; set; }
        public string IdUser { get; set; }
        public int Lido {  get; set; }
        public int Relido { get; set; }
        public LivrosResource Livros { get; set; }
    }
}
