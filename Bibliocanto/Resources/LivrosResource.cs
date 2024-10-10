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

        //public string Autores { get; set; }
        //public string Editora { get; set; }
        //public AutoresResource Autores { get; set; }
        //public GenerosResource Generos { get; set; }
        public EditorasResource Editoras { get; set; }
    }
}
