using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }

        public DbSet<Livros> Livros { get; set; }
        public DbSet<Autores> Autores { get; set; }
        public DbSet<Generos> Generos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Autores>().ToTable("Autores");
            builder.Entity<Autores>().HasKey(p => p.Id);
            builder.Entity<Autores>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Autores>().Property(p => p.NomeAutor).IsRequired().HasMaxLength(150);
            builder.Entity<Autores>().HasMany(p => p.Livros).WithOne(p => p.Autores).HasForeignKey(p => p.AutorId);

            builder.Entity<Autores>().HasData
            (
                new Autores { Id = 100, NomeAutor = "Karl Marx" },
                new Autores { Id = 101, NomeAutor = "Fiódor Dostoiévsk" }
            );

            builder.Entity<Generos>().ToTable("Generos");
            builder.Entity<Generos>().HasKey(p => p.id);
            builder.Entity<Generos>().Property(p => p.id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Generos>().Property(p => p.nomegenero).IsRequired().HasMaxLength(150);
            builder.Entity<Generos>().HasMany(p => p.Livros).WithOne(p => p.Generos).HasForeignKey(p => p.generoid);

            builder.Entity<Generos>().HasData
            (
                new Generos { id = 100, nomegenero = "Ficção" },
                new Generos { id = 101, nomegenero = "Economia" }
            );

            builder.Entity<Livros>().ToTable("Livros");
            builder.Entity<Livros>().HasKey(p => p.Id);
            builder.Entity<Livros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Livros>().Property(p => p.Titulo).IsRequired().HasMaxLength(255);
            builder.Entity<Livros>().Property(p => p.CaminhoImagem).IsRequired().HasMaxLength(555);
            builder.Entity<Livros>().Property(p => p.isbn).IsRequired().HasMaxLength(50);
            builder.Entity<Livros>().Property(p => p.Descricao).IsRequired().HasMaxLength(1555);


            builder.Entity<Livros>().HasData
            (   
                new Livros
                {
                    Id = 100,
                    Titulo = "O Capital",
                    Descricao = "Teste1",
                    CaminhoImagem = "https://m.media-amazon.com/images/I/81M-QDE-7zL._SY425_.jpg",
                    isbn = "978-6557172292",
                    AutorId = 100,
                    generoid = 101
                },
                new Livros
                {
                    Id = 101,
                    Titulo = "Crime e Castigo",
                    Descricao = "Teste2",
                    CaminhoImagem = "https://m.media-amazon.com/images/I/916WkSH4cGL._SY425_.jpg",
                    isbn = "978-8573266467",
                    AutorId = 101,
                    generoid = 100
                }
            );

        }
    }
}
