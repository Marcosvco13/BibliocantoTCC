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
    public class EditorasController : ControllerBase
    {
        private readonly IEditorasService _editorasService;
        private readonly IMapper _mapper;

        public EditorasController(IEditorasService editorasService, IMapper mapper)
        {
            _editorasService = editorasService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<EditorasResource>> GetAllAsync()
        {
            var editoras = await _editorasService.ListAsync();
            var recursos = _mapper.Map<IEnumerable<Editoras>, IEnumerable<EditorasResource>>(editoras);

            return recursos;
        }

        [HttpGet("EditoraByName")]
        public async Task<ActionResult<IEnumerable<EditorasResource>>> GetByName([FromQuery] string name)
        {
            try
            {
                var editora = await _editorasService.GetEditoraByName(name);
                var recursos = _mapper.Map<IEnumerable<Editoras>, IEnumerable<EditorasResource>>(editora);

                if (recursos.Count() == 0)
                {
                    return NotFound($"Não existem editora com o nome de {name}");
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

        [HttpGet("{id:int}", Name = "GetEditoraById")]
        public async Task<ActionResult<EditorasResource>> GetAutorById(int id)
        {

            try
            {
                var editora = await _editorasService.GetById(id);
                var recurso = _mapper.Map<Editoras, EditorasResource>(editora);

                if (editora == null)
                {
                    return NotFound("Editora não encontrada");
                }

                return recurso;
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveEditorasResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var editora = _mapper.Map<SaveEditorasResource, Editoras>(resource);
            var result = await _editorasService.CreateEditora(editora);

            if (!result.Success)
                return BadRequest(result.Message);

            var editoraResource = _mapper.Map<Editoras, EditorasResource>(result.Editora);
            return Ok(editoraResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveEditorasResource recurso)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var editora = _mapper.Map<SaveEditorasResource, Editoras>(recurso);
            var result = await _editorasService.Update(id, editora);

            if (!result.Success)
                return BadRequest(result.Message);

            var editoraResource = _mapper.Map<Editoras, EditorasResource>(result.Editora);
            return Ok(editoraResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _editorasService.Delete(id);

            if (!result.Success)
                return BadRequest(result.Message);

            var editoraResource = _mapper.Map<Editoras, EditorasResource>(result.Editora);
            return Ok(editoraResource);
        }
    }
}
