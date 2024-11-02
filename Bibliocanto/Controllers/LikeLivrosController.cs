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
    public class LikeLivrosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILikeLivrosService _likeLivrosService;
        public LikeLivrosController(IMapper mapper, ILikeLivrosService likeLivrosService)
        {
            _mapper = mapper;
            _likeLivrosService = likeLivrosService;
        }

        [HttpGet("LikeByLivro")]
        public async Task<ActionResult<IEnumerable<LikeLivrosResource>>> GetByLivro([FromQuery] int idLivro)
        {
            try
            {
                var likeLivros = await _likeLivrosService.GetByLivro(idLivro);
                var recursos = _mapper.Map<IEnumerable<LikeLivros>, IEnumerable<LikeLivrosResource>>(likeLivros);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum like para esse livro.");
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
        public async Task<ActionResult<IEnumerable<LikeLivrosResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var likeLivros = await _likeLivrosService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<LikeLivros>, IEnumerable<LikeLivrosResource>>(likeLivros);

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

        [HttpGet("LikeByUserLivro")]
        public async Task<ActionResult<LikeLivrosResource>> GetByLikeUser(string idUser, int idLivro)
        {
            try
            {
                var like = await _likeLivrosService.GetByLikeUser(idUser, idLivro);
                var recursos = _mapper.Map<LikeLivros, LikeLivrosResource>(like);

                if (recursos is null)
                {
                    return NotFound($"Não foi encontrada like para os seu usuário.");
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

        [HttpGet("{id:int}", Name = "GetlikeById")]
        public async Task<ActionResult<LikeLivrosResource>> GetById(int id)
        {

            try
            {
                var like = await _likeLivrosService.GetById(id);
                var recurso = _mapper.Map<LikeLivros, LikeLivrosResource>(like);

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
        public async Task<IActionResult> PostAsync([FromBody] SaveLikeLivrosResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeLivrosResource, LikeLivros>(resource);
            var result = await _likeLivrosService.Create(like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeLivrosResource = _mapper.Map<LikeLivros, LikeLivrosResource>(result.LikeLivros);
            return Ok(LikeLivrosResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveLikeLivrosResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveLikeLivrosResource, LikeLivros>(recurso);
            var result = await _likeLivrosService.Update(id, like);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeLivrosResource = _mapper.Map<LikeLivros, LikeLivrosResource>(result.LikeLivros);
            return Ok(LikeLivrosResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _likeLivrosService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var LikeLivrosResource = _mapper.Map<LikeLivros, LikeLivrosResource>(result.LikeLivros);
            return Ok(LikeLivrosResource);
        }
    }
}
