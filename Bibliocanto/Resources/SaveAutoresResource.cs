﻿using System.ComponentModel.DataAnnotations;

namespace Bibliocanto.Resources
{
    public class SaveAutoresResource
    {
        [Required]
        [MaxLength(150)]
        public string? NomeAutor { get; set; }
    }
}
