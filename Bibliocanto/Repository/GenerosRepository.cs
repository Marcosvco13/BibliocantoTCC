using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class GenerosRepository : BaseRepository, IGenerosRepository
    {
        public GenerosRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Generos>> ListAsync()
        {
            return await _context.Generos.ToListAsync();
        }

        public async Task<IEnumerable<Generos>> GetGeneroByName(string nome)
        {
            return await _context.Generos.Where(n => n.NomeGenero.Contains(nome)).ToListAsync();
        }

        public async Task<Generos> GetById(int id)
        {
            return await _context.Generos.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task CreateGenero(Generos generos)
        {
            await _context.Generos.AddAsync(generos);
        }

        public void Update(Generos generos)
        {
            _context.Generos.Update(generos);
        }

        public void Delete(Generos generos)
        {
            _context.Generos.Remove(generos);
        }
    }
}
