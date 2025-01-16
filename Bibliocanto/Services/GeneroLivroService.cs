using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class GeneroLivroService : IGeneroLivroService
    {
        private readonly IGenerosLivrosRepository _generoLivroRepository;
        private readonly IUnitOFWork _unitOfWork;

        public GeneroLivroService(IGenerosLivrosRepository generoLivroRepository, IUnitOFWork unitOfWork)
        {
            this._generoLivroRepository = generoLivroRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<GeneroLivro>> GetByIdLivro(int idLivro)
        {
            IEnumerable<GeneroLivro> generoLivro;

            generoLivro = await _generoLivroRepository.GetByIdLivro(idLivro);

            return generoLivro;
        }

        public async Task<IEnumerable<GeneroLivro>> GetByIdGenero(int idGenero)
        {
            IEnumerable<GeneroLivro> generoLivro;

            generoLivro = await _generoLivroRepository.GetByIdGenero(idGenero);

            return generoLivro;
        }

        public async Task<GeneroLivro> GetById(int id)
        {
            return await _generoLivroRepository.GetById(id);
        }

        public async Task<GeneroLivroResponse> Add(GeneroLivro generoLivro)
        {
            try
            {
                await _generoLivroRepository.Add(generoLivro);
                await _unitOfWork.CompleteAsync();

                return new GeneroLivroResponse(generoLivro);
            }
            catch (Exception ex)
            {
                return new GeneroLivroResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<GeneroLivroResponse> Update(int id, GeneroLivro generoLivro)
        {
            var exibirAutorLivro = await _generoLivroRepository.GetById(id);

            if (exibirAutorLivro == null)
                return new GeneroLivroResponse("Category not found.");

            exibirAutorLivro.IdLivro = generoLivro.IdLivro;
            exibirAutorLivro.IdGenero = generoLivro.IdGenero;

            try
            {
                _generoLivroRepository.Update(exibirAutorLivro);
                await _unitOfWork.CompleteAsync();

                return new GeneroLivroResponse(exibirAutorLivro);
            }
            catch (Exception ex)
            {
                return new GeneroLivroResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<GeneroLivroResponse> Delete(int id)
        {
            var existingCategory = await _generoLivroRepository.GetById(id);

            if (existingCategory == null)
                return new GeneroLivroResponse("autor não encontrado para o livro.");

            try
            {
                _generoLivroRepository.Delete(existingCategory);
                await _unitOfWork.CompleteAsync();

                return new GeneroLivroResponse(existingCategory);
            }
            catch (Exception ex)
            {
                return new GeneroLivroResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
