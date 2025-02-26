using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class AutoresLivroService : IAutoresLivroService
    {
        private readonly IAutoresLivrosRepository _autoresLivrosRepository;
        private readonly IUnitOFWork _unitOfWork;

        public AutoresLivroService(IAutoresLivrosRepository autoresLivroRepository, IUnitOFWork unitOfWork)
        {
            this._autoresLivrosRepository = autoresLivroRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<AutoresLivros>> GetByIdLivro(int idLivro)
        {
            IEnumerable<AutoresLivros> autoresLivro;

            autoresLivro = await _autoresLivrosRepository.GetByIdLivro(idLivro);

            return autoresLivro;
        }

        public async Task<IEnumerable<AutoresLivros>> GetByIdAutor(int idAutor)
        {
            IEnumerable<AutoresLivros> autoresLivro;

            autoresLivro = await _autoresLivrosRepository.GetByIdAutor(idAutor);

            return autoresLivro;
        }

        public async Task<AutoresLivros> GetById(int id)
        {
            return await _autoresLivrosRepository.GetById(id);
        }

        public async Task<AutoresLivroResponse> Add(AutoresLivros autoresLivros)
        {
            try
            {
                await _autoresLivrosRepository.Add(autoresLivros);
                await _unitOfWork.CompleteAsync();

                return new AutoresLivroResponse(autoresLivros);
            }
            catch (Exception ex)
            {
                return new AutoresLivroResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<AutoresLivroResponse> Update(int id, AutoresLivros autoresLivros)
        {
            var exibirAutorLivro = await _autoresLivrosRepository.GetById(id);

            if (exibirAutorLivro == null)
                return new AutoresLivroResponse("Category not found.");

            exibirAutorLivro.IdLivro = autoresLivros.IdLivro;
            exibirAutorLivro.IdAutor = autoresLivros.IdAutor;

            try
            {
                _autoresLivrosRepository.Update(exibirAutorLivro);
                await _unitOfWork.CompleteAsync();

                return new AutoresLivroResponse(exibirAutorLivro);
            }
            catch (Exception ex)
            {
                return new AutoresLivroResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<AutoresLivroResponse> Delete(int id)
        {
            var existingCategory = await _autoresLivrosRepository.GetById(id);

            if (existingCategory == null)
                return new AutoresLivroResponse("autor não encontrado para o livro.");

            try
            {
                _autoresLivrosRepository.Delete(existingCategory);
                await _unitOfWork.CompleteAsync();

                return new AutoresLivroResponse(existingCategory);
            }
            catch (Exception ex)
            {
                return new AutoresLivroResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
