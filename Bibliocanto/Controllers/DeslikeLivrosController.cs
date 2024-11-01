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
    public class DesDeslikeLivrosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDeslikeLivrosService _deDeslikeLivrosService;
        public DesDeslikeLivrosController(IMapper mapper, IDeslikeLivrosService desDeslikeLivrosService)
        {
            _mapper = mapper;
            _deDeslikeLivrosService = desDeslikeLivrosService;
        }

        [HttpGet("LikeByLivro")]
        public async Task<ActionResult<IEnumerable<DeslikeLivrosResource>>> GetByLivro([FromQuery] int idLivro)
        {
            try
            {
                var DeslikeLivros = await _deDeslikeLivrosService.GetByLivro(idLivro);
                var recursos = _mapper.Map<IEnumerable<DeslikeLivros>, IEnumerable<DeslikeLivrosResource>>(DeslikeLivros);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum deslike para esse livro.");
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
        public async Task<ActionResult<IEnumerable<DeslikeLivrosResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var DeslikeLivros = await _deDeslikeLivrosService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<DeslikeLivros>, IEnumerable<DeslikeLivrosResource>>(DeslikeLivros);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum deslike desse usuário .");
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
        public async Task<ActionResult<DeslikeLivrosResource>> GetByLikeUser(string idUser, int idLivro)
        {
            try
            {
                var like = await _deDeslikeLivrosService.GetByLikeUser(idUser, idLivro);
                var recursos = _mapper.Map<DeslikeLivros, DeslikeLivrosResource>(like);

                if (recursos is null)
                {
                    return NotFound($"Não foi encontrada deslike para os seu usuário.");
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
        public async Task<ActionResult<DeslikeLivrosResource>> GetById(int id)
        {

            try
            {
                var like = await _deDeslikeLivrosService.GetById(id);
                var recurso = _mapper.Map<DeslikeLivros, DeslikeLivrosResource>(like);

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
        public async Task<IActionResult> PostAsync([FromBody] SaveDeslikeLivrosResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveDeslikeLivrosResource, DeslikeLivros>(resource);
            var result = await _deDeslikeLivrosService.Create(like);

            if (!result.Success)
                return BadRequest(result.Message);

            var DeslikeLivrosResource = _mapper.Map<DeslikeLivros, DeslikeLivrosResource>(result.DeslikeLivros);
            return Ok(DeslikeLivrosResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveDeslikeLivrosResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var like = _mapper.Map<SaveDeslikeLivrosResource, DeslikeLivros>(recurso);
            var result = await _deDeslikeLivrosService.Update(id, like);

            if (!result.Success)
                return BadRequest(result.Message);

            var DeslikeLivrosResource = _mapper.Map<DeslikeLivros, DeslikeLivrosResource>(result.DeslikeLivros);
            return Ok(DeslikeLivrosResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _deDeslikeLivrosService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var DeslikeLivrosResource = _mapper.Map<DeslikeLivros, DeslikeLivrosResource>(result.DeslikeLivros);
            return Ok(DeslikeLivrosResource);
        }
    }
}
