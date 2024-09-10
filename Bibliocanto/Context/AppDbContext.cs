using Bibliocanto.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }

        public DbSet<Livros> Livros { get; set; }
        public DbSet<Autores> Autores { get; set; }
        public DbSet<Generos> Generos { get; set; }
        public DbSet<Editoras> Editoras { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Autores>().ToTable("Autores");
            builder.Entity<Autores>().HasKey(p => p.Id);
            builder.Entity<Autores>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Autores>().Property(p => p.NomeAutor).IsRequired().HasMaxLength(150);

            builder.Entity<Autores>().HasData
            (
                new Autores { Id = 100, NomeAutor = "Karl Marx" },
                new Autores { Id = 101, NomeAutor = "Fiódor Dostoiévsk" }
            );

            builder.Entity<Generos>().ToTable("Generos");
            builder.Entity<Generos>().HasKey(p => p.Id);
            builder.Entity<Generos>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Generos>().Property(p => p.NomeGenero).IsRequired().HasMaxLength(150);

            builder.Entity<Generos>().HasData
            (
                new Generos { Id = 100, NomeGenero = "Ficção" },
                new Generos { Id = 101, NomeGenero = "Economia" }
            );

            builder.Entity<Editoras>().ToTable("Editoras");
            builder.Entity<Editoras>().HasKey(p => p.Id);
            builder.Entity<Editoras>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Editoras>().Property(p => p.NomeEditora).IsRequired().HasMaxLength(150);

            builder.Entity<Editoras>().HasData
            (
                new Editoras { Id = 100, NomeEditora = "Boitempo Editorial" },
                new Editoras { Id = 101, NomeEditora = "Editora 34" }
            );

            builder.Entity<Livros>().ToTable("Livros");
            builder.Entity<Livros>().HasKey(p => p.Id);
            builder.Entity<Livros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Livros>().Property(p => p.Titulo).IsRequired().HasMaxLength(255);
            builder.Entity<Livros>().Property(p => p.CaminhoImagem).IsRequired().HasMaxLength(555);
            builder.Entity<Livros>().Property(p => p.Isbn).IsRequired().HasMaxLength(50);
            builder.Entity<Livros>().Property(p => p.Descricao).IsRequired().HasMaxLength(1555);
            builder.Entity<Livros>().HasOne(p => p.Generos).WithMany(p => p.Livros).HasForeignKey(p => p.GeneroId);
            builder.Entity<Livros>().HasOne(p => p.Autores).WithMany(p => p.Livros).HasForeignKey(p => p.AutorId);
            builder.Entity<Livros>().HasOne(p => p.Editoras).WithMany(p => p.Livros).HasForeignKey(p => p.EditoraId);


            builder.Entity<Livros>().HasData
            (   
                new Livros
                {
                    Id = 100,
                    Titulo = "O Capital",
                    Descricao = "Teste1",
                    CaminhoImagem = "https://m.media-amazon.com/images/I/81M-QDE-7zL._SY425_.jpg",
                    Isbn = "978-6557172292",
                    AutorId = 100,
                    GeneroId = 101,
                    EditoraId = 100
                },
                new Livros
                {
                    Id = 101,
                    Titulo = "Crime e Castigo",
                    Descricao = "Teste2",
                    CaminhoImagem = "https://m.media-amazon.com/images/I/916WkSH4cGL._SY425_.jpg",
                    Isbn = "978-8573266467",
                    AutorId = 101,
                    GeneroId = 100,
                    EditoraId = 101
                }
            );

        }
    }
}
