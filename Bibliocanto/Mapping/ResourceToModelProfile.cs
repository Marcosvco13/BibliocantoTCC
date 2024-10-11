using AutoMapper;
using Bibliocanto.Communication;
using Bibliocanto.Models;
using Bibliocanto.Resources;

namespace Bibliocanto.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveAutoresResource, Autores>();
            CreateMap<SaveLivrosResource, Livros>();
            CreateMap<SaveGenerosResource, Generos>();
            CreateMap<SaveEditorasResource, Editoras>();
            CreateMap<SaveMeusLivrosResource, MeusLivros>();
            CreateMap<SaveAutoresLivrosResource, AutoresLivros>();
            CreateMap<SaveGeneroLivroResource, GeneroLivro>();
        }
    }
}
