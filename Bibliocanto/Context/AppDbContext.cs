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

            builder.Entity<Livros>().ToTable("Livros");
            builder.Entity<Livros>().HasKey(p => p.Id);
            builder.Entity<Livros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Livros>().Property(p => p.Titulo).IsRequired().HasMaxLength(255);
            builder.Entity<Livros>().Property(p => p.Descricao).IsRequired().HasMaxLength(1555);

            builder.Entity<Livros>().HasData
            (   
                new Livros
                {
                    Id = 100,
                    Titulo = "O Capital",
                    Descricao = "Teste1",
                    AutorId = 100
                },
                new Livros
                {
                    Id = 101,
                    Titulo = "Crime e Castigo",
                    Descricao = "Teste2",
                    AutorId = 101
                }
            );

        }
    }
}
