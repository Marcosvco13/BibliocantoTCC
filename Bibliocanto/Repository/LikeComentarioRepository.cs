using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class LikeComentarioRepository : BaseRepository, ILikeComentarioRepository
    {
        public LikeComentarioRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<LikeComentario>> GetByUser(string idUser)
        {
            return await _context.LikeComentario.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<LikeComentario>> GetByComentario(int idComentario)
        {
            return await _context.LikeComentario.Where(n => n.IdComentario.Equals(idComentario)).ToListAsync();
        }

        public async Task<LikeComentario> GetByComentarioUser(string idUser, int idComentario)
        {
            return await _context.LikeComentario.FirstOrDefaultAsync(l => l.IdComentario == idComentario && l.IdUser == idUser);
        }

        public async Task<LikeComentario> GetById(int id)
        {
            return await _context.LikeComentario.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(LikeComentario likeComentario)
        {
            await _context.LikeComentario.AddAsync(likeComentario);
        }

        public void Update(LikeComentario likeComentario)
        {
            _context.LikeComentario.Update(likeComentario);
        }

        public void Delete(LikeComentario likeComentario)
        {
            _context.LikeComentario.Remove(likeComentario);
        }
    }
}
