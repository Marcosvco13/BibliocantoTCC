﻿namespace Bibliocanto.Resources
{
    public class LivrosResource
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public AutoresResource Autores { get; set; }
    }
}
