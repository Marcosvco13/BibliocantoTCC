using Bibliocanto.Context;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Services
{
    public class LivrosService : ILivrosService
    {
        private readonly AppDbContext _context;

        public LivrosService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Livros>> GetBaseLivros()
        {
            try
            {
                return await _context.Livros.ToListAsync();
            }
            catch
            {
                throw;
            }
            
        }

        public async Task<Livros> GetBaseLivro(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            return livro;
        }

        public async Task<IEnumerable<Livros>> GetLivroByNome(string nome)
        {
            IEnumerable<Livros> baseLivros;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                baseLivros = await _context.Livros.Where(n => n.NomeLivro.Contains(nome)).ToListAsync();
            }
            else
            {
                baseLivros = await GetBaseLivros();
            }
            return baseLivros;
        }

        public async Task CreateLivro(Livros livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLivro(Livros livro)
        {
            _context.Entry(livro).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLivro(Livros livro)
        {
            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();
        }
    }
}
