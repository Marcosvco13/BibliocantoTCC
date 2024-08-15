using AutoMapper;
using Bibliocanto.Extensions;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerosController : ControllerBase
    {
        private readonly IGenerosService _generosService;
        private readonly IMapper _mapper;

        public GenerosController(IGenerosService generosService, IMapper mapper)
        {
            _generosService = generosService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<GenerosResource>> GetAllAsync()
        {
            var generos = await _generosService.ListAsync();
            var recursos = _mapper.Map<IEnumerable<Generos>, IEnumerable<GenerosResource>>(generos);

            return recursos;
        }

        [HttpGet("GeneroByName")]
        public async Task<ActionResult<IEnumerable<GenerosResource>>> GetByName([FromQuery] string name)
        {
            try
            {
                var generos = await _generosService.GetGeneroByName(name);
                var recursos = _mapper.Map<IEnumerable<Generos>, IEnumerable<GenerosResource>>(generos);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não existem generos com o nome de {name}");
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

        [HttpGet("{id:int}", Name = "GetGeneroById")]
        public async Task<ActionResult<GenerosResource>> GetAutorById(int id)
        {

            try
            {
                var genero = await _generosService.GetById(id);
                var recurso = _mapper.Map<Generos, GenerosResource>(genero);

                if (genero == null)
                {
                    return NotFound("Genero não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveGenerosResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var genero = _mapper.Map<SaveGenerosResource, Generos>(resource);
            var result = await _generosService.CreateGenero(genero);

            if (!result.Success)
                return BadRequest(result.Message);

            var generoResource = _mapper.Map<Generos, GenerosResource>(result.Genero);
            return Ok(generoResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveGenerosResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var genero = _mapper.Map<SaveGenerosResource, Generos>(recurso);
            var result = await _generosService.Update(id, genero);

            if (!result.Success)
                return BadRequest(result.Message);

            var generoResource = _mapper.Map<Generos, GenerosResource>(result.Genero);
            return Ok(generoResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _generosService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var generoResource = _mapper.Map<Generos, GenerosResource>(result.Genero);
            return Ok(generoResource);
        }
    }
}
