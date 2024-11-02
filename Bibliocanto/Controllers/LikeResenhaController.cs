using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bibliocanto.Extensions;
using AutoMapper;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.IServices;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeResenhaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILikeResenhaService _likeResenhaService;
        public LikeResenhaController(IMapper mapper, ILikeResenhaService likeResenhaService)
        {
            _mapper = mapper;
            _likeResenhaService = likeResenhaService;
        }

        [HttpGet("LikeByResenha")]
        public async Task<ActionResult<IEnumerable<LikeResenhaResource>>> GetByResenha([FromQuery] int idResenha)
        {
            try
            {
                var likeResenha = await _likeResenhaService.GetByResenha(idResenha);
                var recursos = _mapper.Map<IEnumerable<LikeResenha>, IEnumerable<LikeResenhaResource>>(likeResenha);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum like para essa resenha.");
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

        [HttpGet("likeByUser")]
        public async Task<ActionResult<IEnumerable<LikeResenhaResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var likeResenha = await _likeResenhaService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<LikeResenha>, IEnumerable<LikeResenhaResource>>(likeResenha);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum like desse usuário .");
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

        [HttpGet("LikeByUserResenha")]
        public async Task<ActionResult<LikeResenhaResource>> GetByUser(string idUser, int idResenha)
        {
            try
            {
                var like = await _likeResenhaService.GetByResenhaUser(idUser, idResenha);
                var recursos = _mapper.Map<LikeResenha, LikeResenhaResource>(like);

                if (recursos is null)
                {
                    return NotFound($"Não foi encontrada like para os seus usuários.");
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

        [HttpGet("{id:int}", Name = "GetlikeoById")]
        public async Task<ActionResult<LikeResenhaResource>> GetById(int id)
        {

            try
            {
                var like = await _likeResenhaService.GetById(id);
                var recurso = _mapper.Map<LikeResenha, LikeResenhaResource>(like);

                if (like == null)
                {
                    return NotFound("like não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveLikeResenhaResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeResenhaResource, LikeResenha>(resource);
            var result = await _likeResenhaService.Create(like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeResenhaResource = _mapper.Map<LikeResenha, LikeResenhaResource>(result.LikeResenha);
            return Ok(LikeResenhaResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveLikeResenhaResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeResenhaResource, LikeResenha>(recurso);
            var result = await _likeResenhaService.Update(id, like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeResenhaResource = _mapper.Map<LikeResenha, LikeResenhaResource>(result.LikeResenha);
            return Ok(LikeResenhaResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _likeResenhaService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeResenhaResource = _mapper.Map<LikeResenha, LikeResenhaResource>(result.LikeResenha);
            return Ok(LikeResenhaResource);
        }
    }
}
