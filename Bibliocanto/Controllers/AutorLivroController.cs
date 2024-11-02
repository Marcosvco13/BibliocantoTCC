using AutoMapper;
using Bibliocanto.Communication;
using Bibliocanto.Extensions;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorLivroController : ControllerBase
    {
        private IAutoresLivroService _autorLivroService;
        private readonly IMapper _mapper;

        public AutorLivroController(IAutoresLivroService autorLivrosService, IMapper mapper)
        {
            _autorLivroService = autorLivrosService;
            _mapper = mapper;
        }

        [HttpGet("{idLivro:int}", Name = "GetByIdLivroAutor")]
        public async Task<ActionResult<IEnumerable<AutorLivroResource>>> GetByIdLivro(int idLivro)
        {

            try
            {
                var autorlivro = await _autorLivroService.GetByIdLivro(idLivro);
                var recurso = _mapper.Map<IEnumerable<AutoresLivros>, IEnumerable<AutorLivroResource>>(autorlivro);

                if (autorlivro == null)
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
        public async Task<ActionResult<AutorLivroResource>> GetById(int id)
        {

            try
            {
                var autorlivro = await _autorLivroService.GetById(id);
                var recurso = _mapper.Map<AutoresLivros, AutorLivroResource>(autorlivro);

                if (autorlivro == null)
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
        public async Task<IActionResult> PostAsync([FromBody] AutorLivroResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var autorlivro = _mapper.Map<AutorLivroResource, AutoresLivros>(resource);
            var result = await _autorLivroService.Add(autorlivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var autorlivroResource = _mapper.Map<AutoresLivros, AutorLivroResource>(result.AutorLivro);
            return Ok(autorlivroResource);
        }

        [HttpPut("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutAsync(int id, [FromBody] AutorLivroResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var autorlivro = _mapper.Map<AutorLivroResource, AutoresLivros>(recurso);
            var result = await _autorLivroService.Update(id, autorlivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var autorlivroResource = _mapper.Map<AutoresLivros, AutorLivroResource>(result.AutorLivro);
            return Ok(autorlivroResource);
        }

        [HttpDelete("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _autorLivroService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var autorlivroResource = _mapper.Map<AutoresLivros, AutorLivroResource>(result.AutorLivro);
            return Ok(autorlivroResource);
        }
    }
}
