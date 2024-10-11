using AutoMapper;
using Bibliocanto.Extensions;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerosLivroController : ControllerBase
    {
        private IGeneroLivroService _generoLivroService;
        private readonly IMapper _mapper;

        public GenerosLivroController(IGeneroLivroService generoLivrosService, IMapper mapper)
        {
            _generoLivroService = generoLivrosService;
            _mapper = mapper;
        }

        [HttpGet("{idLivro:int}", Name = "GetByIdLivro")]
        public async Task<ActionResult<IEnumerable<GeneroLivroResource>>> GetByIdLivro(int idLivro)
        {

            try
            {
                var generolivro = await _generoLivroService.GetByIdLivro(idLivro);
                var recurso = _mapper.Map<IEnumerable<GeneroLivro>, IEnumerable<GeneroLivroResource>>(generolivro);

                if (generolivro == null)
                {
                    return NotFound("registro não encontrado");
                }

                return Ok(recurso);
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<GeneroLivroResource>> GetById(int id)
        {

            try
            {
                var generolivro = await _generoLivroService.GetById(id);
                var recurso = _mapper.Map<GeneroLivro, GeneroLivroResource>(generolivro);

                if (generolivro == null)
                {
                    return NotFound("registro não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostAsync([FromBody] GeneroLivroResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var generolivro = _mapper.Map<GeneroLivroResource, GeneroLivro>(resource);
            var result = await _generoLivroService.Add(generolivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var generolivroResource = _mapper.Map<GeneroLivro, GeneroLivroResource>(result.GeneroLivro);
            return Ok(generolivroResource);
        }

        [HttpPut("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutAsync(int id, [FromBody] GeneroLivroResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var generolivro = _mapper.Map<GeneroLivroResource, GeneroLivro>(recurso);
            var result = await _generoLivroService.Update(id, generolivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var generolivroResource = _mapper.Map<GeneroLivro, GeneroLivroResource>(result.GeneroLivro);
            return Ok(generolivroResource);
        }

        [HttpDelete("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _generoLivroService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var generolivroResource = _mapper.Map<GeneroLivro, GeneroLivroResource>(result.GeneroLivro);
            return Ok(generolivroResource);
        }
    }
}
