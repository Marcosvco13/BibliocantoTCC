using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Repository
{
    public class LivrosRepository : BaseRepository, ILivrosRepository
    {
        public LivrosRepository(AppDbContext context) : base(context) 
        { 
        
        }

        public async Task<IEnumerable<Livros>> GetBaseLivros()
        {
            return await _context.Livros.Include(p => p.Autores).ToListAsync();
        }

        public async Task<IEnumerable<Livros>> GetLivrosByNome(string nome)
        {
            return await _context.Livros.Where(n => n.Titulo.Contains(nome)).ToListAsync();
        }

        public async Task AddLivro(Livros livro)
        {
            await _context.Livros.AddAsync(livro);
        }
    }
}
