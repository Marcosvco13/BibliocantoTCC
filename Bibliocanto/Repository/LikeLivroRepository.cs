using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class LikeLivroRepository : BaseRepository, ILikeLivroRepository
    {
        public LikeLivroRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<LikeLivros>> GetByUser(string idUser)
        {
            return await _context.LikeLivros.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<LikeLivros>> GetByLivro(int idLivro)
        {
            return await _context.LikeLivros.Where(n => n.IdLivro.Equals(idLivro)).ToListAsync();
        }

        public async Task<LikeLivros> GetByLikeUser(string idUser, int idLivro)
        {
            return await _context.LikeLivros.FirstOrDefaultAsync(l => l.IdLivro == idLivro && l.IdUser == idUser);
        }

        public async Task<LikeLivros> GetById(int id)
        {
            return await _context.LikeLivros.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(LikeLivros likeLivros)
        {
            await _context.LikeLivros.AddAsync(likeLivros);
        }

        public void Update(LikeLivros likeLivros)
        {
            _context.LikeLivros.Update(likeLivros);
        }

        public void Delete(LikeLivros likeLivros)
        {
            _context.LikeLivros.Remove(likeLivros);
        }
    }
}
