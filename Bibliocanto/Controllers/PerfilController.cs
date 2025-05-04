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
    public class PerfilController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPerfilService _perfilService;

        public PerfilController(IMapper mapper, IPerfilService perfilService)
        {
            _mapper = mapper;
            _perfilService = perfilService;
        }

        [HttpGet("GetByUser")]
        public async Task<ActionResult<PerfilResource>> GetByUser(string idUser)
        {
            try
            {
                var perfilUser = await _perfilService.GetByUser(idUser);
                var recurso = _mapper.Map<Perfil, PerfilResource>(perfilUser);
                if (perfilUser == null)
                {
                    return NotFound("Perfil não encontrado");
                }
                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpGet("GetByUserBoolean")]
        public async Task<ActionResult<bool>> GetByUserBoolean(string idUser)
        {
            try
            {
                var perfilUser = await _perfilService.GetByUser(idUser);
                return perfilUser != null;
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PerfilResource>> GetById(int id)
        {
            try
            {
                var perfilUser = await _perfilService.GetById(id);
                var recurso = _mapper.Map<Perfil, PerfilResource>(perfilUser);
                if (perfilUser == null)
                {
                    return NotFound("Perfil não encontrado");
                }
                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SavePerfilResource resource)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.GetErrorMessages();
                foreach (var error in errors)
                {
                    Console.WriteLine("Erro de validação: " + error);
                }
                return BadRequest(errors);
            }

            var perfil = _mapper.Map<SavePerfilResource, Perfil>(resource);
            var result = await _perfilService.Create(perfil);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuPerfilResource = _mapper.Map<Perfil, PerfilResource>(result.Perfil);
            return Ok(meuPerfilResource);
        }

        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] SavePerfilResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var perfil = _mapper.Map<SavePerfilResource, Perfil>(recurso);
            var result = await _perfilService.Update(id, perfil);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuPerfilResource = _mapper.Map<Perfil, PerfilResource>(result.Perfil);
            return Ok(meuPerfilResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _perfilService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuPerfilResource = _mapper.Map<Perfil, PerfilResource>(result.Perfil);
            return Ok(meuPerfilResource);
        }
    }
}
