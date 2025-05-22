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
    public class DenunciasController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDenunciasService _denunciasService;

        public DenunciasController(IMapper mapper, IDenunciasService denunciasService)
        {
            _mapper = mapper;
            _denunciasService = denunciasService;
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DenunciasResource>> GetById(int id)
        {

            try
            {
                var denuncia = await _denunciasService.GetById(id);
                var recurso = _mapper.Map<Denuncias, DenunciasResource>(denuncia);

                if (denuncia == null)
                {
                    return NotFound("Denúncia não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpGet("GetByIdResenhaAndIdUser")]
        public async Task<IActionResult> GetByIdResenhaAndIdUser(int idResenha, string idUser)
        {
            try
            {
                var denuncia = await _denunciasService.GetByIdResenhaAndIdUser(idResenha, idUser);

                if (denuncia == null)
                {
                    return Ok(false);
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest($"Request inválido: {ex.Message}");
            }
        }

        [HttpGet("GetByIdComentarioAndIdUser")]
        public async Task<IActionResult> GetByIdComentarioAndIdUser(int idComentario, string idUser)
        {
            try
            {
                var denuncia = await _denunciasService.GetByIdComentarioAndIdUser(idComentario, idUser);

                if (denuncia == null)
                {
                    return Ok(false);
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest($"Request inválido: {ex.Message}");
            }
        }

        [HttpGet("DenunciasByUser")]
        public async Task<ActionResult<IEnumerable<DenunciasResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var denuncias = await _denunciasService.GetAllByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<Denuncias>, IEnumerable<DenunciasResource>>(denuncias);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada denúncias para os seus usuários.");
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

        [HttpGet("DenunciasByResenha")]
        public async Task<ActionResult<IEnumerable<DenunciasResource>>> GetAllByIdResenha([FromQuery] int idResenha)
        {
            try
            {
                var denuncias = await _denunciasService.GetAllByIdResenha(idResenha);
                var recursos = _mapper.Map<IEnumerable<Denuncias>, IEnumerable<DenunciasResource>>(denuncias);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada denúncias para a resenha.");
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

        [HttpGet("DenunciasByComentario")]
        public async Task<ActionResult<IEnumerable<DenunciasResource>>> GetAllByIdComentario([FromQuery] int idComentario)
        {
            try
            {
                var denuncias = await _denunciasService.GetAllByIdComentario(idComentario);
                var recursos = _mapper.Map<IEnumerable<Denuncias>, IEnumerable<DenunciasResource>>(denuncias);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada denúncias para o comentário.");
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

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveDenunciasResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var denuncia = _mapper.Map<SaveDenunciasResource, Denuncias>(resource);
            var result = await _denunciasService.Create(denuncia);

            if (!result.Success)
                return BadRequest(result.Message);

            var denunciaResource = _mapper.Map<Denuncias, DenunciasResource>(result.Denuncias);
            return Ok(denunciaResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveDenunciasResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var denuncia = _mapper.Map<SaveDenunciasResource, Denuncias>(recurso);
            var result = await _denunciasService.Update(id, denuncia);

            if (!result.Success)
                return BadRequest(result.Message);

            var denunciaResource = _mapper.Map<Denuncias, DenunciasResource>(result.Denuncias);
            return Ok(denunciaResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _denunciasService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var denunciaResource = _mapper.Map<Denuncias, DenunciasResource>(result.Denuncias);
            return Ok(denunciaResource);
        }
    }
}
