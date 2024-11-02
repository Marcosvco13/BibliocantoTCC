namespace Bibliocanto.Resources
{
    public class LivrosResource
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string CaminhoImagem { get; set; }
        public string Isbn { get; set; }
        public string LinkCompra {  get; set; }
        public EditorasResource Editoras { get; set; }
    }
}
