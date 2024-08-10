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
        }
    }
}
