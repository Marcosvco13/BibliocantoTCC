using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class EditorasRepository : BaseRepository, IEditorasRepository
    {
        public EditorasRepository(AppDbContext context) : base(context) 
        { 

        }

        public async Task<IEnumerable<Editoras>> ListAsync()
        {
            return await _context.Editoras.ToListAsync();
        }

        public async Task<IEnumerable<Editoras>> GetEditoraByName(string nome)
        {
            return await _context.Editoras.Where(n => n.NomeEditora.Contains(nome)).ToListAsync();
        }

        public async Task<Editoras> GetById(int id)
        {
            return await _context.Editoras.FirstOrDefaultAsync(l => l.Id == id); ;
        }

        public async Task CreateEditora(Editoras editora)
        {
            await _context.Editoras.AddAsync(editora);
        }

        public void Update(Editoras editora)
        {
            _context.Editoras.Update(editora);
        }

        public void Delete(Editoras editora)
        {
            _context.Editoras.Remove(editora);
        }
    }
}
