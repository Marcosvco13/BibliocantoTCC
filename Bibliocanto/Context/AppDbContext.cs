﻿using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }

        public DbSet<Livros> Livros { get; set; }
        public DbSet<Estantes> Estantes { get; set; }
        public DbSet<Resenhas> Resenhas { get; set; }
        public DbSet<ComentarioResenha> ComentarioResenhas { get; set; }
        public DbSet<AvaliacaoResenha> AvaliacaoResenhas { get; set; }
        public DbSet<AvaliacaoLivro> AvaliacaoLivros { get; set; }
        public DbSet<AvaliacaoComentario> AvaliacaoComentarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Livros>().HasData(
                new Livros
                {
                    Id = 1,
                    NomeLivro = "Crime e Castigo",
                    IdAutor = 1,
                    IdGenero = 1,
                    CaminhoImagem = "https://m.media-amazon.com/images/I/612oPQzTN7L._SY466_.jpg",
                    IdEditora = 1,
                },
                new Livros
                {
                    Id = 2,
                    NomeLivro = "Guerra do Velho",
                    IdAutor = 2,
                    IdGenero = 2,
                    CaminhoImagem = "https://m.media-amazon.com/images/I/612oPQzTN7L._SY466_.jpg",
                    IdEditora = 2,
                }
            ) ;
        }
    }
}
