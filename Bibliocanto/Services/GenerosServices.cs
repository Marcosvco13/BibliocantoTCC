using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class GenerosServices : IGenerosService
    {
        private readonly IGenerosRepository _generoRepository;
        private readonly IUnitOFWork _unitOfWork;

        public GenerosServices(IGenerosRepository generosRepository, IUnitOFWork unitOfWork)
        {
            _generoRepository = generosRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Generos>> ListAsync()
        {
            return await _generoRepository.ListAsync();
        }

        public async Task<IEnumerable<Generos>> GetGeneroByName(string nome)
        {
            IEnumerable<Generos> baseGenero;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                baseGenero = await _generoRepository.GetGeneroByName(nome);
            }
            else
            {
                baseGenero = await ListAsync();
            }
            return baseGenero;
        }
        public async Task<Generos> GetById(int id)
        {
            return await _generoRepository.GetById(id);
        }

        public async Task<GenerosResponse> CreateGenero(Generos genero)
        {
            try
            {
                await _generoRepository.CreateGenero(genero);
                await _unitOfWork.CompleteAsync();

                return new GenerosResponse(genero);
            }
            catch (Exception ex)
            {
                return new GenerosResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<GenerosResponse> Update(int id, Generos genero)
        {
            var generoExistente = await _generoRepository.GetById(id);

            if (generoExistente == null)
                return new GenerosResponse("Category not found.");
            generoExistente.nomegenero = genero.nomegenero;

            try
            {
                _generoRepository.Update(generoExistente);
                await _unitOfWork.CompleteAsync();

                return new GenerosResponse(generoExistente);
            }
            catch (Exception ex)
            {
                return new GenerosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<GenerosResponse> Delete(int id)
        {
            var generoExistente = await _generoRepository.GetById(id);

            if (generoExistente == null)
                return new GenerosResponse("Category not found.");

            try
            {
                _generoRepository.Delete(generoExistente);
                await _unitOfWork.CompleteAsync();

                return new GenerosResponse(generoExistente);
            }
            catch (Exception ex)
            {
                return new GenerosResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
