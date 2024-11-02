using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public class DeslikeLivrosService : IDeslikeLivrosService
    {
        private readonly IDeslikeLivrosRepository _desDeslikeLivrosRepository;
        private readonly IUnitOFWork _unitOfWork;

        public DeslikeLivrosService(IDeslikeLivrosRepository desDeslikeLivrosRepository, IUnitOFWork unitOfWork)
        {
            _desDeslikeLivrosRepository = desDeslikeLivrosRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<DeslikeLivros> GetById(int id)
        {
            return await _desDeslikeLivrosRepository.GetById(id);
        }

        public async Task<DeslikeLivros> GetByLikeUser(string idUser, int idLivro)
        {
            return await _desDeslikeLivrosRepository.GetByLikeUser(idUser, idLivro);
        }

        public async Task<IEnumerable<DeslikeLivros>> GetByLivro(int idLivro)
        {
            IEnumerable<DeslikeLivros> baseDeslikeLivros;
            if (idLivro == null)
            {
                baseDeslikeLivros = await _desDeslikeLivrosRepository.GetByLivro(idLivro);
            }
            else
            {
                baseDeslikeLivros = null;
            }
            return baseDeslikeLivros;
        }

        public async Task<IEnumerable<DeslikeLivros>> GetByUser(string idUser)
        {
            IEnumerable<DeslikeLivros> baseDeslikeLivros;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseDeslikeLivros = await _desDeslikeLivrosRepository.GetByUser(idUser);
            }
            else
            {
                baseDeslikeLivros = null;
            }
            return baseDeslikeLivros;
        }

        public async Task<DeslikeLivrosResponse> Create(DeslikeLivros DeslikeLivros)
        {
            try
            {
                await _desDeslikeLivrosRepository.Create(DeslikeLivros);
                await _unitOfWork.CompleteAsync();

                return new DeslikeLivrosResponse(DeslikeLivros);
            }
            catch (Exception ex)
            {
                return new DeslikeLivrosResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<DeslikeLivrosResponse> Update(int id, DeslikeLivros DeslikeLivros)
        {
            var DeslikeLivrosExistente = await _desDeslikeLivrosRepository.GetById(id);

            if (DeslikeLivrosExistente == null)
                return new DeslikeLivrosResponse("Category not found.");

            try
            {
                _desDeslikeLivrosRepository.Update(DeslikeLivrosExistente);
                await _unitOfWork.CompleteAsync();

                return new DeslikeLivrosResponse(DeslikeLivrosExistente);
            }
            catch (Exception ex)
            {
                return new DeslikeLivrosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<DeslikeLivrosResponse> Delete(int id)
        {
            var deleteDeslikeLivros = await _desDeslikeLivrosRepository.GetById(id);

            if (deleteDeslikeLivros == null)
                return new DeslikeLivrosResponse("Category not found.");

            try
            {
                _desDeslikeLivrosRepository.Delete(deleteDeslikeLivros);
                await _unitOfWork.CompleteAsync();

                return new DeslikeLivrosResponse(deleteDeslikeLivros);
            }
            catch (Exception ex)
            {
                return new DeslikeLivrosResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
