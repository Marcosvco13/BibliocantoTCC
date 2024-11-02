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
        public DbSet<MeusLivros> MeusLivros { get; set; }
        public DbSet<AutoresLivros> AutoresLivros { get; set; }
        public DbSet<GeneroLivro> GeneroLivro { get; set; }
        public DbSet<Avaliacao> Avaliacao { get; set; }
        public DbSet<Resenha> Resenha { get; set; }
        public DbSet<LikeResenha> LikeResenha { get; set; }
        public DbSet<Comentarios> Comentarios { get; set; }
        public DbSet<LikeComentario> LikeComentario { get; set; }
        public DbSet<LikeLivros> LikeLivros { get; set; }
        public DbSet<DeslikeLivros> DeslikeLivros { get; set; }


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
            builder.Entity<Livros>().Property(p => p.LinkCompra).HasMaxLength(1555);
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
                    LinkCompra = "https://www.amazon.com.br/Capital-Livro-Nova-Edi%C3%A7%C3%A3o-Economia/dp/6557172298/ref=asc_df_6557172298/?tag=googleshopp00-20&linkCode=df0&hvadid=709857900213&hvpos=&hvnetw=g&hvrand=12565139690516924554&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9074297&hvtargid=pla-2257126917247&psc=1&mcid=bcf17339abcb345caf390142900d9cf0&gad_source=1",
                    EditoraId = 100
                },
                new Livros
                {
                    Id = 101,
                    Titulo = "Crime e Castigo",
                    Descricao = "Teste2",
                    CaminhoImagem = "https://m.media-amazon.com/images/I/916WkSH4cGL._SY425_.jpg",
                    Isbn = "978-8573266467",
                    LinkCompra = "https://www.amazon.com.br/Crime-castigo-Fi%C3%B3dor-Dostoi%C3%A9vski/dp/8573266465/ref=sr_1_2?crid=13FKB6RQ2CU9P&dib=eyJ2IjoiMSJ9.xRK2CPz6wHADW2bbeza12iXIdYTE1b8laAl1mo7pe6T7F-75rihUORLzkzKFN0bxuWi4BXvXTYgwScAnidBALK2ADtJPH1uNo88fLuIodrkqVeP7tlRceQXaJwor4yGr2PCF1B5wA_iswX0OecSE_sc-RZUxW4RFbeImc3efHZTSVDSP_DPtrtnRe4p1-Aa3HjIg19etqBliVEClU29DCnDJhT8UuPj_194tpXNv1Ik.S27CmhJuVLJHDjYE6QQ_97plH5mIIt0FvUvfVGQC__M&dib_tag=se&keywords=crime+e+castigo&qid=1728956605&s=books&sprefix=crime+e+%2Cstripbooks%2C220&sr=1-2",
                    EditoraId = 100
                }
            );


            builder.Entity<MeusLivros>().ToTable("MeusLivros");
            builder.Entity<MeusLivros>().HasKey(p => p.Id);
            builder.Entity<MeusLivros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<MeusLivros>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<MeusLivros>().Property(p => p.Lido);
            builder.Entity<MeusLivros>().Property(p => p.Relido);
            builder.Entity<MeusLivros>().HasOne(p => p.Livros).WithMany(p => p.MeusLivros).HasForeignKey(p => p.IdLivro);

            builder.Entity<AutoresLivros>().ToTable("AutoresLivro");
            builder.Entity<AutoresLivros>().HasKey(p => p.Id);
            builder.Entity<AutoresLivros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<AutoresLivros>().Property(p => p.IdLivro);
            builder.Entity<AutoresLivros>().Property(p => p.IdAutor);

            builder.Entity<AutoresLivros>().HasData
            (
                new AutoresLivros { Id = 1, IdLivro = 100, IdAutor = 101 },
                new AutoresLivros { Id = 2, IdLivro = 101, IdAutor = 100 }
            );

            builder.Entity<GeneroLivro>().ToTable("GenerosLivro");
            builder.Entity<GeneroLivro>().HasKey(p => p.Id);
            builder.Entity<GeneroLivro>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<GeneroLivro>().Property(p => p.IdLivro);
            builder.Entity<GeneroLivro>().Property(p => p.IdGenero);

            builder.Entity<GeneroLivro>().HasData
            (
                new GeneroLivro { Id = 1, IdLivro = 100, IdGenero = 100 },
                new GeneroLivro { Id = 2, IdLivro = 101, IdGenero = 101 }
            );

            builder.Entity<Avaliacao>().ToTable("Avaliacao");
            builder.Entity<Avaliacao>().HasKey(p => p.Id);
            builder.Entity<Avaliacao>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Avaliacao>().Property(p => p.IdLivro).IsRequired();
            builder.Entity<Avaliacao>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<Avaliacao>().Property(p => p.Estrelas);

            builder.Entity<Resenha>().ToTable("Resenha");
            builder.Entity<Resenha>().HasKey(p => p.Id);
            builder.Entity<Resenha>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Resenha>().Property(p => p.IdLivro).IsRequired();
            builder.Entity<Resenha>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<Resenha>().Property(p => p.TextoResenha).HasMaxLength(2000);

            builder.Entity<LikeResenha>().ToTable("LikeResenha");
            builder.Entity<LikeResenha>().HasKey(p => p.Id);
            builder.Entity<LikeResenha>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<LikeResenha>().Property(p => p.IdResenha).IsRequired();
            builder.Entity<LikeResenha>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<LikeResenha>().Property(p => p.Like);

            builder.Entity<Comentarios>().ToTable("Comentario");
            builder.Entity<Comentarios>().HasKey(p => p.Id);
            builder.Entity<Comentarios>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Comentarios>().Property(p => p.IdResenha).IsRequired();
            builder.Entity<Comentarios>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<Comentarios>().Property(p => p.TextoComent).HasMaxLength(450);

            builder.Entity<LikeComentario>().ToTable("LikeComentarios");
            builder.Entity<LikeComentario>().HasKey(p => p.Id);
            builder.Entity<LikeComentario>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<LikeComentario>().Property(p => p.IdComentario).IsRequired();
            builder.Entity<LikeComentario>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<LikeComentario>().Property(p => p.Like);

            builder.Entity<LikeLivros>().ToTable("LikeLivros");
            builder.Entity<LikeLivros>().HasKey(p => p.Id);
            builder.Entity<LikeLivros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<LikeLivros>().Property(p => p.IdLivro).IsRequired();
            builder.Entity<LikeLivros>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<LikeLivros>().Property(p => p.Like);

            builder.Entity<DeslikeLivros>().ToTable("DeslikeLivros");
            builder.Entity<DeslikeLivros>().HasKey(p => p.Id);
            builder.Entity<DeslikeLivros>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<DeslikeLivros>().Property(p => p.IdLivro).IsRequired();
            builder.Entity<DeslikeLivros>().Property(p => p.IdUser).IsRequired().HasMaxLength(450);
            builder.Entity<DeslikeLivros>().Property(p => p.Deslike);
        }
    }
}
