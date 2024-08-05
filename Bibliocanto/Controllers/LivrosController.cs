using Bibliocanto.Models;
using Bibliocanto.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bibliocanto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivrosController : ControllerBase
    {
        private ILivrosService _livroService;

        public LivrosController(ILivrosService livrosService)
        {
            _livroService = livrosService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Livros>>> GetLivros()
        {
            try
            {
                var livros = await _livroService.GetBaseLivros();
                return Ok(livros);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter livros.");
            }
        }

        [HttpGet("LivroPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Livros>>> GetLivrosByName([FromQuery] string nome)
        {
            try
            {
                var livros = await _livroService.GetLivroByNome(nome);

                if (livros.Count() == 0)
                {
                    return NotFound($"Não existem livros com o nome de {nome}");
                }
                else
                {
                    return Ok(livros);
                }
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpGet("{id:int}", Name = "GetLivroById")]
        public async Task<ActionResult<Livros>> GetLivroById(int id)
        {
            try
            {
                var livros = await _livroService.GetBaseLivro(id);

                if (livros == null)
                {
                    return NotFound($"Não existem livros com o id: {id}");
                }
                else
                {
                    return Ok(livros);
                }
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Livros livro)
        {
            try
            {
                await _livroService.CreateLivro(livro);
                return CreatedAtRoute(nameof(GetLivroById), new { id = livro.Id }, livro);
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Livros livro)
        {
            try
            {
                if (livro.Id == id)
                {
                    await _livroService.UpdateLivro(livro);
                    return Ok($"Livro atualizado com sucesso");
                }
                else
                {
                    return BadRequest("Dados inconsistentes");
                }
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var livro = await _livroService.GetBaseLivro(id);
                if(livro != null)
                {
                    await _livroService.DeleteLivro(livro);
                    return Ok($"Livro de id: {id} foi excluido com sucesso");
                }
                else
                {
                    return NotFound($"Não foi encontrado livro com o id: {id}");
                }
            }
            catch
            {
                return BadRequest("Request Inválido");
            }
        }
    }
}
