using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class AutoresRepository : BaseRepository, IAutoresRepository
    {
        public AutoresRepository(AppDbContext context) : base(context) 
        {
            
        }

        public async Task<IEnumerable<Autores>> ListAsync()
        {
            return await _context.Autores.ToListAsync();
        }

        public async Task<IEnumerable<Autores>> GetAutorByName(string nome)
        {
            return await _context.Autores.Where(n => n.NomeAutor.Contains(nome)).ToListAsync();
        }

        public async Task CreateAutor(Autores autor)
        {
            await _context.Autores.AddAsync(autor);
        }
    }
}
