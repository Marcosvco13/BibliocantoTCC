﻿using AutoMapper;
using Bibliocanto.Communication;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoresController : ControllerBase
    {
        private readonly IAutoresService _autoresService;
        private readonly IMapper _mapper;

        public AutoresController(IAutoresService autoresService, IMapper mapper)
        {
            _autoresService = autoresService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<AutoresResource>> GetAllAsync()
        {
            var autores = await _autoresService.ListAsync();
            var recursos = _mapper.Map<IEnumerable<Autores>, IEnumerable<AutoresResource>>(autores);

            return recursos;
        }

        [HttpGet("AutorByName")]
        public async Task<ActionResult<IEnumerable<AutoresResource>>> GetByName([FromQuery] string name)
        {
            try
            {
                var autor = await _autoresService.GetAutorByName(name);
                var recursos = _mapper.Map<IEnumerable<Autores>, IEnumerable<AutoresResource>>(autor);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não existem autores com o nome de {name}");
                }
                else
                {
                    return Ok(recursos);
                }
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveAutoresResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var autor = _mapper.Map<SaveAutoresResource, Autores>(resource);
            var result = await _autoresService.CreateAutor(autor);

            if (!result.Success)
                return BadRequest(result.Message);

            var autorResource = _mapper.Map<Autores, AutoresResource>(result.Autor);
            return Ok(autorResource);
        }
    }
}
