using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class LikeLivrosService : ILikeLivrosService
    {
        private readonly ILikeLivroRepository _likeLivroRepository;
        private readonly IUnitOFWork _unitOfWork;

        public LikeLivrosService(ILikeLivroRepository likeLivroRepository, IUnitOFWork unitOfWork)
        {
            _likeLivroRepository = likeLivroRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<LikeLivros> GetById(int id)
        {
            return await _likeLivroRepository.GetById(id);
        }

        public async Task<LikeLivros> GetByLikeUser(string idUser, int idLivro)
        {
            return await _likeLivroRepository.GetByLikeUser(idUser, idLivro);
        }

        public async Task<IEnumerable<LikeLivros>> GetByLivro(int idLivro)
        {
            IEnumerable<LikeLivros> baseLikeLivros;
            if (idLivro == null)
            {
                baseLikeLivros = await _likeLivroRepository.GetByLivro(idLivro);
            }
            else
            {
                baseLikeLivros = null;
            }
            return baseLikeLivros;
        }

        public async Task<IEnumerable<LikeLivros>> GetByUser(string idUser)
        {
            IEnumerable<LikeLivros> baseLikeLivros;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseLikeLivros = await _likeLivroRepository.GetByUser(idUser);
            }
            else
            {
                baseLikeLivros = null;
            }
            return baseLikeLivros;
        }

        public async Task<LikeLivrosResponse> Create(LikeLivros LikeLivros)
        {
            try
            {
                await _likeLivroRepository.Create(LikeLivros);
                await _unitOfWork.CompleteAsync();

                return new LikeLivrosResponse(LikeLivros);
            }
            catch (Exception ex)
            {
                return new LikeLivrosResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<LikeLivrosResponse> Update(int id, LikeLivros LikeLivros)
        {
            var LikeLivrosExistente = await _likeLivroRepository.GetById(id);

            if (LikeLivrosExistente == null)
                return new LikeLivrosResponse("Like not found.");

            try
            {
                _likeLivroRepository.Update(LikeLivrosExistente);
                await _unitOfWork.CompleteAsync();

                return new LikeLivrosResponse(LikeLivrosExistente);
            }
            catch (Exception ex)
            {
                return new LikeLivrosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<LikeLivrosResponse> Delete(int id)
        {
            var deleteLikeLivros = await _likeLivroRepository.GetById(id);

            if (deleteLikeLivros == null)
                return new LikeLivrosResponse("Like not found.");

            try
            {
                _likeLivroRepository.Delete(deleteLikeLivros);
                await _unitOfWork.CompleteAsync();

                return new LikeLivrosResponse(deleteLikeLivros);
            }
            catch (Exception ex)
            {
                return new LikeLivrosResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
