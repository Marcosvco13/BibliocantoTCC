using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class AutoresLivroRepository : BaseRepository, IAutoresLivrosRepository
    {
        public AutoresLivroRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<AutoresLivros>> GetByIdLivro(int idLivro)
        {
            return await _context.AutoresLivros.Where(l => l.IdLivro == idLivro).ToListAsync(); ;
        }
        public async Task<IEnumerable<AutoresLivros>> GetByIdAutor(int idAutor)
        {
            return await _context.AutoresLivros.Where(l => l.IdAutor == idAutor).ToListAsync(); ;
        }

        public async Task<AutoresLivros> GetById(int id)
        {
            return await _context.AutoresLivros.FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task Add(AutoresLivros autoresLivro)
        {
            await _context.AutoresLivros.AddAsync(autoresLivro);
        }

        public void Update(AutoresLivros autoresLivro)
        {
            _context.AutoresLivros.Update(autoresLivro);
        }

        public void Delete(AutoresLivros autoresLivro)
        {
            _context.AutoresLivros.Remove(autoresLivro);
        }
    }
}