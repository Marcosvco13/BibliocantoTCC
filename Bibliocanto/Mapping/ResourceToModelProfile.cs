﻿using AutoMapper;
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
        }
    }
}
