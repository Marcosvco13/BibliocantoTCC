using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class GeneroLivroRepository : BaseRepository, IGenerosLivrosRepository
    {

        public GeneroLivroRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<GeneroLivro>> GetByIdLivro(int idLivro)
        {
            return await _context.GeneroLivro.Where(l => l.IdLivro == idLivro).ToListAsync(); ;
        }

        public async Task<IEnumerable<GeneroLivro>> GetByIdGenero(int idGenero)
        {
            return await _context.GeneroLivro.Where(l => l.IdGenero == idGenero).ToListAsync(); ;
        }

        public async Task<GeneroLivro> GetById(int id)
        {
            return await _context.GeneroLivro.FirstOrDefaultAsync(l => l.IdGenero == id);
        }

        public async Task Add(GeneroLivro generoLivro)
        {
            await _context.GeneroLivro.AddAsync(generoLivro);
        }

        public void Update(GeneroLivro generoLivro)
        {
            _context.GeneroLivro.Update(generoLivro);
        }

        public void Delete(GeneroLivro generoLivro)
        {
            _context.GeneroLivro.Remove(generoLivro);
        }
    }
}