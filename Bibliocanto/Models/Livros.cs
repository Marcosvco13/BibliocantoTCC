using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Models
{
    public class Livros
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descricao { get; set; }
        public string? CaminhoImagem { get; set; }
        public string? isbn { get; set; }


        public int AutorId { get; set; }
        public Autores? Autores { get; set; }
        //public int generoid { get; set; }
        //public Generos? Generos { get; set; }

    }
}
