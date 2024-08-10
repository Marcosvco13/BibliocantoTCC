using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class LivrosRepository : BaseRepository, ILivrosRepository
    {
        public LivrosRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Livros>> GetBaseLivros()
        {
            return await _context.Livros.Include(p => p.Autores).ToListAsync();
        }
    }
}
