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
    public class ResenhaController : ControllerBase
    { 
        private readonly IMapper _mapper;
        private readonly IResenhaService _resenhaService;
        public ResenhaController(IMapper mapper, IResenhaService resenhaService)
        {
            _mapper = mapper;
            _resenhaService = resenhaService;
        }

        [HttpGet("ResenhaByLivro")]
        public async Task<ActionResult<IEnumerable<ResenhaResource>>> GetByLivro([FromQuery] int idLivro)
        {
            try
            {
                var resenha = await _resenhaService.GetByLivro(idLivro);
                var recursos = _mapper.Map<IEnumerable<Resenha>, IEnumerable<ResenhaResource>>(resenha);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhuma resenha para esse livro.");
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

        [HttpGet("ResenhaByUser")]
        public async Task<ActionResult<IEnumerable<ResenhaResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var resenha = await _resenhaService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<Resenha>, IEnumerable<ResenhaResource>>(resenha);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhuma resenha desse usuário usuários.");
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

        [HttpGet("ResenhaByUserLivro")]
        public async Task<ActionResult<ResenhaResource>> GetByUser(string idUser, int idLivro)
        {
            try
            {
                var resenha = await _resenhaService.GetByLivroUser(idUser, idLivro);
                var recursos = _mapper.Map<Resenha, ResenhaResource>(resenha);

                if (recursos is null)
                {
                    return NotFound($"Não foi encontrada avaliações para os seus usuários.");
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

        [HttpGet("{id:int}", Name = "GetResenhaById")]
        public async Task<ActionResult<ResenhaResource>> GetById(int id)
        {

            try
            {
                var resenha = await _resenhaService.GetById(id);
                var recurso = _mapper.Map<Resenha, ResenhaResource>(resenha);

                if (resenha == null)
                {
                    return NotFound("avaliação não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveResenhaResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var resenha = _mapper.Map<SaveResenhaResource, Resenha>(resource);
            var result = await _resenhaService.Create(resenha);

            if (!result.Success)
                return BadRequest(result.Message);

            var resenhaResource = _mapper.Map<Resenha, ResenhaResource>(result.Resenha);
            return Ok(resenhaResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveResenhaResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var resenha = _mapper.Map<SaveResenhaResource, Resenha>(recurso);
            var result = await _resenhaService.Update(id, resenha);

            if (!result.Success)
                return BadRequest(result.Message);

            var resenhaResource = _mapper.Map<Resenha, ResenhaResource>(result.Resenha);
            return Ok(resenhaResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _resenhaService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var resenhaResource = _mapper.Map<Resenha, ResenhaResource>(result.Resenha);
            return Ok(resenhaResource);
        }
    }
}
