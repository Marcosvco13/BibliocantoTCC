using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class PerfilRepository : BaseRepository, IPerfilRepository
    {
        public PerfilRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<Perfil> GetByUser(string idUser)
        {
            return await _context.Perfil.FirstOrDefaultAsync(p => p.IdUser == idUser); ;
        }

        public async Task<Perfil> GetById(int id)
        {
            return await _context.Perfil.FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task Create(Perfil perfil)
        {
            await _context.Perfil.AddAsync(perfil);
        }

        public void Update(Perfil perfil)
        {
            _context.Perfil.Update(perfil);
        }

        public void Delete(Perfil perfil)
        {
            _context.Perfil.Remove(perfil);
        }
    }
}
