using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class LikeResenhaRespository : BaseRepository, ILikeResenhaRepository
    {
        public LikeResenhaRespository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<LikeResenha>> GetByUser(string idUser)
        {
            return await _context.LikeResenha.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<LikeResenha>> GetByResenha(int idResenha)
        {
            return await _context.LikeResenha.Where(n => n.IdResenha.Equals(idResenha)).ToListAsync();
        }

        public async Task<LikeResenha> GetById(int id)
        {
            return await _context.LikeResenha.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(LikeResenha likeResenha)
        {
            await _context.LikeResenha.AddAsync(likeResenha);
        }

        public void Update(LikeResenha likeResenha)
        {
            _context.LikeResenha.Update(likeResenha);
        }

        public void Delete(LikeResenha likeResenha)
        {
            _context.LikeResenha.Remove(likeResenha);
        }
    }
}
