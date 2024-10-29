using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class ResenhaRepository : BaseRepository, IResenhaRepository
    {
        public ResenhaRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Resenha>> GetByUser(string idUser)
        {
            return await _context.Resenha.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<Resenha>> GetByLivro(int idLivro)
        {
            return await _context.Resenha.Where(n => n.IdLivro.Equals(idLivro)).ToListAsync();
        }

        public async Task<Resenha> GetByLivroUser(string idUser, int idLivro)
        {
            return await _context.Resenha.FirstOrDefaultAsync(l => l.IdLivro == idLivro && l.IdUser == idUser);
        }

        public async Task<Resenha> GetById(int id)
        {
            return await _context.Resenha.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(Resenha resenha)
        {
            await _context.Resenha.AddAsync(resenha);
        }

        public void Update(Resenha resenha)
        {
            _context.Resenha.Update(resenha);
        }

        public void Delete(Resenha resenha)
        {
            _context.Resenha.Remove(resenha);
        }
    }
}
