using AutoMapper;
using Bibliocanto.Models;
using Bibliocanto.Resources;

namespace Bibliocanto.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveAutoresResource, Autores>();
        }
    }
}
