﻿namespace Bibliocanto.Models
{
    public class LikeResenha
    {
        public int Id { get; set; }
        public int IdResenha { get; set; }
        public string IdUser { get; set; }
        public int Like {  get; set; }
    }
}
