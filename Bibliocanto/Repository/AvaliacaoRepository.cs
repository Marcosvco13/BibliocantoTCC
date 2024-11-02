using System.Linq;
using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class AvaliacaoRepository : BaseRepository, IAvaliacaoRepository
    {
        public AvaliacaoRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Avaliacao>> GetByUser(string idUser)
        {
            return await _context.Avaliacao.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<Avaliacao>> GetByLivro(int idLivro)
        {
            return await _context.Avaliacao.Where(n => n.IdLivro.Equals(idLivro)).ToListAsync();
        }

        public async Task<Avaliacao> GetByLivroUser(string idUser, int idLivro)
        {
            return await _context.Avaliacao.FirstOrDefaultAsync(l => l.IdLivro == idLivro && l.IdUser == idUser);
        }

        public async Task<Avaliacao> GetById(int id)
        {
            return await _context.Avaliacao.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(Avaliacao avaliacao)
        {
            await _context.Avaliacao.AddAsync(avaliacao);
        }

        public void Update(Avaliacao avaliacao)
        {
            _context.Avaliacao.Update(avaliacao);
        }

        public void Delete(Avaliacao avaliacao)
        {
            _context.Avaliacao.Remove(avaliacao);
        }
    }
}
