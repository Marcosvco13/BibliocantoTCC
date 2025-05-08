﻿using Bibliocanto.Context;
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
            //return await _context.Livros.Include(p => p.Autores).Include(l => l.Generos).Include(d => d.Editoras).ToListAsync();
            return await _context.Livros.Include(d => d.Editoras).ToListAsync();
        }

        public async Task<IEnumerable<Livros>> GetLivrosByNome(string nome)
        {
            //return await _context.Livros.Where(l => l.Titulo.Contains(nome)).Include(p => p.Autores).Include(l => l.Generos).Include(d => d.Editoras).ToListAsync();
            return await _context.Livros.Where(l => l.Titulo.Contains(nome)).Include(d => d.Editoras).ToListAsync();
        }

        public async Task<Livros> GetLivroById(int id)
        {
            //return await _context.Livros.Include(p => p.Autores).Include(l => l.Generos).Include(d => d.Editoras).FirstOrDefaultAsync(l => l.Id == id);
            return await _context.Livros.Include(d => d.Editoras).FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<Livros> GetLivroByIsbn(string isbn)
        {
            return await _context.Livros.FirstOrDefaultAsync(l => l.Isbn == isbn);
        }

        public async Task<IEnumerable<Livros>> GetLivrosByIdEditora(int id)
        {
            return await _context.Livros.Where(l => l.EditoraId == id).ToListAsync();
        }

        public async Task AddLivro(Livros livro)
        {
            await _context.Livros.AddAsync(livro);
        }

        public void UpdateLivro(Livros livro)
        {
             _context.Livros.Update(livro);
        }

        public void Delete(Livros livro)
        {
            _context.Livros.Remove(livro);
        }
    }
}
