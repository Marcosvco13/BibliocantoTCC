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
    public class PreferenciasController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPreferenciasService _preferenciasService;

        public PreferenciasController(IMapper mapper, IPreferenciasService preferenciasService)
        {
            _mapper = mapper;
            _preferenciasService = preferenciasService;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PreferenciasResource>> GetById(int id)
        {

            try
            {
                var prefencia = await _preferenciasService.GetById(id);
                var recurso = _mapper.Map<Preferencias, PreferenciasResource>(prefencia);

                if (prefencia == null)
                {
                    return NotFound("Preferências não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpGet("PreferenciaByUser")]
        public async Task<ActionResult<IEnumerable<PreferenciasResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var prefencias = await _preferenciasService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<Preferencias>, IEnumerable<PreferenciasResource>>(prefencias);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não foi encontrada preferências para os seus usuários.");
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
        public async Task<IActionResult> PostAsync([FromBody] SavePreferenciasResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var preferencia = _mapper.Map<SavePreferenciasResource, Preferencias>(resource);
            var result = await _preferenciasService.Create(preferencia);

            if (!result.Success)
                return BadRequest(result.Message);

            var preferenciaResource = _mapper.Map<Preferencias, PreferenciasResource>(result.Preferencia);
            return Ok(preferenciaResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _preferenciasService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var preferenciaResource = _mapper.Map<Preferencias, PreferenciasResource>(result.Preferencia);
            return Ok(preferenciaResource);
        }
    }
}
