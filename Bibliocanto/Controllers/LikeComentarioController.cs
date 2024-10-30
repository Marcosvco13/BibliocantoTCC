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
    public class LikeComentarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILikeComentarioService _likeComentarioService;
        public LikeComentarioController(IMapper mapper, ILikeComentarioService likeComentarioService)
        {
            _mapper = mapper;
            _likeComentarioService = likeComentarioService;
        }

        [HttpGet("LikeByComentario")]
        public async Task<ActionResult<IEnumerable<LikeComentarioResource>>> GetByComentario([FromQuery] int idComentario)
        {
            try
            {
                var like = await _likeComentarioService.GetByComentario(idComentario);
                var recursos = _mapper.Map<IEnumerable<LikeComentario>, IEnumerable<LikeComentarioResource>>(like);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum like para esse comentario.");
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
        public async Task<ActionResult<IEnumerable<LikeComentarioResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var like = await _likeComentarioService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<LikeComentario>, IEnumerable<LikeComentarioResource>>(like);

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

        [HttpGet("LikeByUserComentario")]
        public async Task<ActionResult<LikeComentarioResource>> GetByUser(string idUser, int idComentario)
        {
            try
            {
                var like = await _likeComentarioService.GetByComentarioUser(idUser, idComentario);
                var recursos = _mapper.Map<LikeComentario, LikeComentarioResource>(like);

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
        public async Task<ActionResult<LikeComentarioResource>> GetById(int id)
        {

            try
            {
                var like = await _likeComentarioService.GetById(id);
                var recurso = _mapper.Map<LikeComentario, LikeComentarioResource>(like);

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
        public async Task<IActionResult> PostAsync([FromBody] SaveLikeComentarioResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeComentarioResource, LikeComentario>(resource);
            var result = await _likeComentarioService.Create(like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeComentarioResource = _mapper.Map<LikeComentario, LikeComentarioResource>(result.LikeComentario);
            return Ok(LikeComentarioResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveLikeComentarioResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeComentarioResource, LikeComentario>(recurso);
            var result = await _likeComentarioService.Update(id, like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeComentarioResource = _mapper.Map<LikeComentario, LikeComentarioResource>(result.LikeComentario);
            return Ok(LikeComentarioResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _likeComentarioService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeComentarioResource = _mapper.Map<LikeComentario, LikeComentarioResource>(result.LikeComentario);
            return Ok(LikeComentarioResource);
        }
    }
}
