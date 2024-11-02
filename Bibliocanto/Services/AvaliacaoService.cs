using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public class AvaliacaoService : IAvaliacaoService
    {
        private readonly IAvaliacaoRepository _avaliacaoRepository;
        private readonly IUnitOFWork _unitOfWork;

        public AvaliacaoService(IAvaliacaoRepository avaliacaoRepository, IUnitOFWork unitOfWork)
        {
            _avaliacaoRepository = avaliacaoRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Avaliacao> GetById(int id)
        {
            return await _avaliacaoRepository.GetById(id);
        }

        public async Task<Avaliacao> GetByLivroUser(string idUser, int idLivro)
        {
            return await _avaliacaoRepository.GetByLivroUser(idUser, idLivro);
        }

        public async Task<IEnumerable<Avaliacao>> GetByLivro(int idLivro)
        {
            IEnumerable<Avaliacao> baseAvaliacao;
            if (idLivro == null)
            {
                baseAvaliacao = await _avaliacaoRepository.GetByLivro(idLivro);
            }
            else
            {
                baseAvaliacao = null;
            }
            return baseAvaliacao;
        }

        public async Task<IEnumerable<Avaliacao>> GetByUser(string idUser)
        {
            IEnumerable<Avaliacao> baseAvaliacao;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseAvaliacao = await _avaliacaoRepository.GetByUser(idUser);
            }
            else
            {
                baseAvaliacao = null;
            }
            return baseAvaliacao;
        }

        public async Task<AvaliacaoResponse> Create(Avaliacao avaliacao)
        {
            try
            {
                await _avaliacaoRepository.Create(avaliacao);
                await _unitOfWork.CompleteAsync();

                return new AvaliacaoResponse(avaliacao);
            }
            catch (Exception ex)
            {
                return new AvaliacaoResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<AvaliacaoResponse> Update(int id, Avaliacao avaliacao)
        {
            var avaliacaoExistente = await _avaliacaoRepository.GetById(id);

            if (avaliacaoExistente == null)
                return new AvaliacaoResponse("Category not found.");

            try
            {
                _avaliacaoRepository.Update(avaliacaoExistente);
                await _unitOfWork.CompleteAsync();

                return new AvaliacaoResponse(avaliacaoExistente);
            }
            catch (Exception ex)
            {
                return new AvaliacaoResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<AvaliacaoResponse> Delete(int id)
        {
            var deleteAvaliacao = await _avaliacaoRepository.GetById(id);

            if (deleteAvaliacao == null)
                return new AvaliacaoResponse("Category not found.");

            try
            {
                _avaliacaoRepository.Delete(deleteAvaliacao);
                await _unitOfWork.CompleteAsync();

                return new AvaliacaoResponse(deleteAvaliacao);
            }
            catch (Exception ex)
            {
                return new AvaliacaoResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
