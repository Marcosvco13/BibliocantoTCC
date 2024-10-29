using AutoMapper;
using Bibliocanto.Extensions;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAvaliacaoService _avaliacaoService;
        public AvaliacaoController(IMapper mapper, IAvaliacaoService avaliacaoService)
        {
            _mapper = mapper;
            _avaliacaoService = avaliacaoService;
        }

        [HttpGet("AvaliacaoByLivro")]
        public async Task<ActionResult<IEnumerable<AvaliacaoResource>>> GetByLivro([FromQuery] int idLivro)
        {
            try
            {
                var avaliacaos = await _avaliacaoService.GetByLivro(idLivro);
                var recursos = _mapper.Map<IEnumerable<Avaliacao>, IEnumerable<AvaliacaoResource>>(avaliacaos);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada avaliações para esse livro.");
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

        [HttpGet("AvaliacaoByUser")]
        public async Task<ActionResult<IEnumerable<AvaliacaoResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var avaliacaos = await _avaliacaoService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<Avaliacao>, IEnumerable<AvaliacaoResource>>(avaliacaos);

                if (recursos.Count() == 0)
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

        [HttpGet("AvaliacaoByUserLivro")]
        public async Task<ActionResult<AvaliacaoResource>> GetByUser(string idUser, int idLivro)
        {
            try
            {
                var avaliacaos = await _avaliacaoService.GetByLivroUser(idUser, idLivro);
                var recursos = _mapper.Map<Avaliacao, AvaliacaoResource>(avaliacaos);

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

        [HttpGet("{id:int}", Name = "GetAvaliacaoById")]
        public async Task<ActionResult<AvaliacaoResource>> GetById(int id)
        {

            try
            {
                var avaliacao = await _avaliacaoService.GetById(id);
                var recurso = _mapper.Map<Avaliacao, AvaliacaoResource>(avaliacao);

                if (avaliacao == null)
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
        public async Task<IActionResult> PostAsync([FromBody] SaveAvaliacaoResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var avaliacao = _mapper.Map<SaveAvaliacaoResource, Avaliacao>(resource);
            var result = await _avaliacaoService.Create(avaliacao);

            if (!result.Success)
                return BadRequest(result.Message);

            var avaliacaoResource = _mapper.Map<Avaliacao, AvaliacaoResource>(result.Avaliacao);
            return Ok(avaliacaoResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveAvaliacaoResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var avaliacao = _mapper.Map<SaveAvaliacaoResource, Avaliacao>(recurso);
            var result = await _avaliacaoService.Update(id, avaliacao);

            if (!result.Success)
                return BadRequest(result.Message);

            var avaliacaoResource = _mapper.Map<Avaliacao, AvaliacaoResource>(result.Avaliacao);
            return Ok(avaliacaoResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _avaliacaoService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var avaliacaoResource = _mapper.Map<Avaliacao, AvaliacaoResource>(result.Avaliacao);
            return Ok(avaliacaoResource);
        }
    }
}
