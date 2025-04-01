using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class MeusLivrosRepository : BaseRepository, IMeusLivrosRepository
    {
        public MeusLivrosRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<MeusLivros>> GetByUser(string idUser)
        {
            return await _context.MeusLivros.Where(n => n.IdUser.Contains(idUser)).Include(p => p.Livros).ToListAsync();
        }

        public async Task<IEnumerable<MeusLivros>> GetLivrosLidosByUser(string idUser)
        {
            return await _context.MeusLivros.Where(n => n.IdUser.Contains(idUser) && n.Lido == 1).Include(p => p.Livros).ToListAsync();
        }

        public async Task<IEnumerable<MeusLivros>> GetLivrosRelidosByUser(string idUser)
        {
            return await _context.MeusLivros.Where(n => n.IdUser.Contains(idUser) && n.Relido == 1).Include(p => p.Livros).ToListAsync();
        }

        public async Task<bool> GetByIdLivroIdUser(int idLivro, string idUser)
        { 
            return await _context.MeusLivros.AnyAsync(n => n.IdUser ==idUser && n.IdLivro == idLivro);
        }
        public async Task<MeusLivros> GetMeuLivroByIdLivroIdUser(int idLivro, string idUser)
        {
            return await _context.MeusLivros.Include(p => p.Livros).FirstAsync(l => l.IdLivro == idLivro && l.IdUser == idUser);
        }

        public async Task<MeusLivros> GetById(int id)
        {
            return await _context.MeusLivros
                .Include(p => p.Livros)
                    .ThenInclude(l => l.Editoras)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task CreateMyLibrary(MeusLivros meusLivros)
        {
            await _context.MeusLivros.AddAsync(meusLivros);
        }

        public void Update(MeusLivros meusLivros)
        {
            _context.MeusLivros.Update(meusLivros);
        }

        public void Delete(MeusLivros meusLivros)
        {
            _context.MeusLivros.Remove(meusLivros);
        }
    }
}
