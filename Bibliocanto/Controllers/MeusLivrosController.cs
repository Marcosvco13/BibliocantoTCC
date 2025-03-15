using AutoMapper;
using Bibliocanto.Extensions;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Bibliocanto.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class MeusLivrosController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMeusLivrosService _meusLivrosService;

        public MeusLivrosController(IMapper mapper, IMeusLivrosService meusLivrosService)
        {
            _mapper = mapper;
            _meusLivrosService = meusLivrosService;
        }

        [HttpGet("BibliotecaByUser")]
        public async Task<ActionResult<IEnumerable<MeusLivrosResource>>> GetByUser([FromQuery] string idUser)
        {
            try
            {
                var biblioteca = await _meusLivrosService.GetByUser(idUser);
                var recursos = _mapper.Map<IEnumerable<MeusLivros>, IEnumerable<MeusLivrosResource>>(biblioteca);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Você não tem livros na biblioteca.");
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

        [HttpGet("ConfirmaByUserLivro")]
        public async Task<bool> GetByUser(int idLivro, string idUser)
        {
            var retorno = await _meusLivrosService.GetByIdLivroIdUser(idLivro, idUser);
            return retorno;
        }

        [HttpGet("{id:int}", Name = "GetMeuLivroById")]
        public async Task<ActionResult<MeusLivrosResource>> GetById(int id)
        {

            try
            {
                var livroBiblioteca = await _meusLivrosService.GetById(id);
                var recurso = _mapper.Map<MeusLivros, MeusLivrosResource>(livroBiblioteca);

                if (livroBiblioteca == null)
                {
                    return NotFound("livro não encontrado");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveMeusLivrosResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var meuLivro = _mapper.Map<SaveMeusLivrosResource, MeusLivros>(resource);
            var result = await _meusLivrosService.CreateMyLibrary(meuLivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuLivroResource = _mapper.Map<MeusLivros, MeusLivrosResource>(result.MeuLivro);
            return Ok(meuLivroResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveMeusLivrosResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var meuLivro = _mapper.Map<SaveMeusLivrosResource, MeusLivros>(recurso);
            var result = await _meusLivrosService.Update(id, meuLivro);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuLivroResource = _mapper.Map<MeusLivros, MeusLivrosResource>(result.MeuLivro);
            return Ok(meuLivroResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _meusLivrosService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var meuLivroResource = _mapper.Map<MeusLivros, MeusLivrosResource>(result.MeuLivro);
            return Ok(meuLivroResource);
        }
    }
}
