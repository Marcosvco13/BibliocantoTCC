using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class DeslikeLivrosRepository : BaseRepository, IDeslikeLivrosRepository
    {
        public DeslikeLivrosRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<DeslikeLivros>> GetByUser(string idUser)
        {
            return await _context.DeslikeLivros.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<DeslikeLivros>> GetByLivro(int idLivro)
        {
            return await _context.DeslikeLivros.Where(n => n.IdLivro.Equals(idLivro)).ToListAsync();
        }

        public async Task<DeslikeLivros> GetByLikeUser(string idUser, int idLivro)
        {
            return await _context.DeslikeLivros.FirstOrDefaultAsync(l => l.IdLivro == idLivro && l.IdUser == idUser);
        }

        public async Task<DeslikeLivros> GetById(int id)
        {
            return await _context.DeslikeLivros.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(DeslikeLivros deslikeLivros)
        {
            await _context.DeslikeLivros.AddAsync(deslikeLivros);
        }

        public void Update(DeslikeLivros deslikeLivros)
        {
            _context.DeslikeLivros.Update(deslikeLivros);
        }

        public void Delete(DeslikeLivros deslikeLivros)
        {
            _context.DeslikeLivros.Remove(deslikeLivros);
        }
    }
}
