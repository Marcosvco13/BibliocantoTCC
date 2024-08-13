using Bibliocanto.Communication;
using Bibliocanto.Context;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Services
{
    public class LivrosService : ILivrosService
    {
        private readonly ILivrosRepository _livrosRepository;
        private readonly IUnitOFWork _unitOfWork;

        public LivrosService(ILivrosRepository livrosRepository, IUnitOFWork unitOfWork)
        {
            this._livrosRepository = livrosRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Livros>> GetBaseLivros()
        {
            return await _livrosRepository.GetBaseLivros(); 
        }

        public async Task<Livros> GetLivroById(int id)
        {
            return await _livrosRepository.GetLivroById(id);
        }

        public async Task<IEnumerable<Livros>> GetLivroByNome(string nome)
        {
            IEnumerable<Livros> baseLivros;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                baseLivros = await _livrosRepository.GetLivrosByNome(nome);
            }
            else
            {
                baseLivros = await GetBaseLivros();
            }
            return baseLivros;
        }

        public async Task<SaveLivrosResponse> AddLivro(Livros livro)
        {
            try
            {
                await _livrosRepository.AddLivro(livro);
                await _unitOfWork.CompleteAsync();

                return new SaveLivrosResponse(livro);
            }
            catch (Exception ex)
            {
                return new SaveLivrosResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<SaveLivrosResponse> UpdateLivro(int id, Livros livro)
        {
            var exibirLivro = await _livrosRepository.GetLivroById(id);

            if (exibirLivro == null)
                return new SaveLivrosResponse("Category not found.");

            exibirLivro.Titulo = livro.Titulo;

            try
            {
                _livrosRepository.UpdateLivro(exibirLivro);
                await _unitOfWork.CompleteAsync();

                return new SaveLivrosResponse(exibirLivro);
            }
            catch (Exception ex)
            {
                return new SaveLivrosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        //public async Task DeleteLivro(Livros livro)
        //{
        //    _context.Livros.Remove(livro);
        //    await _context.SaveChangesAsync();
        //}
    }
}