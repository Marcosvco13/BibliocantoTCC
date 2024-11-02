using AutoMapper;
using Bibliocanto.Models;
using Bibliocanto.Resources;

namespace Bibliocanto.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile() 
        {
            CreateMap<Autores, AutoresResource>();
            CreateMap<Livros,  LivrosResource>();
            CreateMap<Generos, GenerosResource>();
            CreateMap<Editoras, EditorasResource>();
            CreateMap<MeusLivros, MeusLivrosResource>();
            CreateMap<AutoresLivros, AutorLivroResource>();
            CreateMap<GeneroLivro, GeneroLivroResource>();
            CreateMap<Resenha, ResenhaResource>();
            CreateMap<Avaliacao, AvaliacaoResource>();
            CreateMap<Comentarios, ComentariosResource>();
            CreateMap<LikeResenha, LikeResenhaResource>();
            CreateMap<LikeComentario, LikeComentarioResource>();
            CreateMap<LikeLivros, LikeLivrosResource>();
            CreateMap<DeslikeLivros, DeslikeLivrosResource>();
        }
    }
}
