using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class DenunciasRepository : BaseRepository, IDenunciasRepository
    {
        public DenunciasRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Denuncias>> GetAllByUser(string idUser)
        {
            return await _context.Denuncias.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<Denuncias>> GetAllByIdResenha(int idResenha)
        {
            return await _context.Denuncias.Where(n => n.IdResenha.Equals(idResenha)).ToListAsync();
        }

        public async Task<IEnumerable<Denuncias>> GetAllByIdComentario(int idComentario)
        {
            return await _context.Denuncias.Where(n => n.IdComentario.Equals(idComentario)).ToListAsync();
        }

        public async Task<Denuncias> GetById(int id)
        {
            return await _context.Denuncias.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task<Denuncias> GetByIdResenhaAndIdUser(int idResenha, string idUser)
        {
            return await _context.Denuncias.FirstOrDefaultAsync(d => d.IdResenha == idResenha && d.IdUser == idUser);
        }

        public async Task<Denuncias> GetByIdComentarioAndIdUser(int idComentario, string idUser)
        {
            return await _context.Denuncias.FirstOrDefaultAsync(d => d.IdComentario == idComentario && d.IdUser == idUser);
        }

        public async Task Create(Denuncias denuncias)
        {
            await _context.Denuncias.AddAsync(denuncias);
        }

        public void Update(Denuncias denuncias)
        {
            _context.Denuncias.Update(denuncias);
        }

        public void Delete(Denuncias denuncias)
        {
            _context.Denuncias.Remove(denuncias);
        }
    }
}
