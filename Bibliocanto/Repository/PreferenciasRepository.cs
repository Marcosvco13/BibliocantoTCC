using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class PreferenciasRepository : BaseRepository, IPreferenciasRepository
    {
        public PreferenciasRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Preferencias>> GetByUser(string idUser)
        {
            return await _context.Preferencias.Where(n => n.IdUser.Contains(idUser)).ToListAsync();
        }

        public async Task<Preferencias> GetById(int id)
        {
            return await _context.Preferencias.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task Create(Preferencias preferencias)
        {
            await _context.Preferencias.AddAsync(preferencias);
        }

        public void Delete(Preferencias preferencias)
        {
            _context.Preferencias.Remove(preferencias);
        }

        public void DeleteByUser(string idUser)
        {
            var preferenciasDoUsuario = _context.Preferencias.Where(p => p.IdUser == idUser).ToList();

            _context.Preferencias.RemoveRange(preferenciasDoUsuario);
            _context.SaveChanges();
        }
    }
}
