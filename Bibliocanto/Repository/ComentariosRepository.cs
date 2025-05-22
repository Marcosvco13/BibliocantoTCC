using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class ComentariosRepository : BaseRepository, IComentarioRepository
    {
        public ComentariosRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Comentarios>> GetByUser(string idUser)
        {
            return await _context.Comentarios.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<IEnumerable<Comentarios>> GetByResenha(int idResenha)
        {
            return await _context.Comentarios.Where(n => n.IdResenha.Equals(idResenha)).Where(n => _context.Denuncias.Count(d => d.IdComentario == n.Id) <= 3).ToListAsync();

        }

        public async Task<Comentarios> GetByResenhaUser(string idUser, int idResenha)
        {
            return await _context.Comentarios.FirstOrDefaultAsync(l => l.IdResenha == idResenha && l.IdUser == idUser);
        }

        public async Task<Comentarios> GetById(int id)
        {
            return await _context.Comentarios.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(Comentarios comentarios)
        {
            await _context.Comentarios.AddAsync(comentarios);
        }

        public void Update(Comentarios comentarios)
        {
            _context.Comentarios.Update(comentarios);
        }

        public void Delete(Comentarios comentarios)
        {
            _context.Comentarios.Remove(comentarios);
        }
    }
}
