using AutoMapper;
using Bibliocanto.IServices;
using Bibliocanto.Extensions;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : ControllerBase
    { 
        private readonly IMapper _mapper;
        private readonly IComentarioService _comentarioService;
        public ComentarioController(IMapper mapper, IComentarioService comentarioService)
        {
            _mapper = mapper;
            _comentarioService = comentarioService;
        }

        [HttpGet("ComentarioByResenha")]
        public async Task<ActionResult<IEnumerable<ComentariosResource>>> GetByLivro([FromQuery] int idResenha)
        {
            try
            {
                var comentario = await _comentarioService.GetByResenha(idResenha);
                var recursos = _mapper.Map<IEnumerable<Comentarios>, IEnumerable<ComentariosResource>>(comentario);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum comentario para essa resenha.");
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

        [HttpGet("ComentarioByUser")]
        public async Task<ActionResult<IEnumerable<ComentariosResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var comentario = await _comentarioService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<Comentarios>, IEnumerable<ComentariosResource>>(comentario);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada nenhum comentario desse usuário .");
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

        [HttpGet("ComentarioByUserResenha")]
        public async Task<ActionResult<ComentariosResource>> GetByUser(string idUser, int idResenha)
        {
            try
            {
                var comentario = await _comentarioService.GetByResenhaUser(idUser, idResenha);
                var recursos = _mapper.Map<Comentarios, ComentariosResource>(comentario);

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

        [HttpGet("{id:int}", Name = "GetComentarioById")]
        public async Task<ActionResult<ComentariosResource>> GetById(int id)
        {

            try
            {
                var comentario = await _comentarioService.GetById(id);
                var recurso = _mapper.Map<Comentarios, ComentariosResource>(comentario);

                if (comentario == null)
                {
                    return NotFound("comentario não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveComentariosResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var comentario = _mapper.Map<SaveComentariosResource, Comentarios>(resource);
            var result = await _comentarioService.Create(comentario);

            if (!result.Success)
                return BadRequest(result.Message);

            var comentariosResource = _mapper.Map<Comentarios, ComentariosResource>(result.Comentario);
            return Ok(comentariosResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveComentariosResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var comentario = _mapper.Map<SaveComentariosResource, Comentarios>(recurso);
            var result = await _comentarioService.Update(id, comentario);

            if (!result.Success)
                return BadRequest(result.Message);

            var comentariosResource = _mapper.Map<Comentarios, ComentariosResource>(result.Comentario);
            return Ok(comentariosResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _comentarioService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var comentariosResource = _mapper.Map<Comentarios, ComentariosResource>(result.Comentario);
            return Ok(comentariosResource);
        }
    }
}
