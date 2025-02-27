using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class LikeResenhaService : ILikeResenhaService
    {
        private readonly ILikeResenhaRepository _likeResenhaRepository;
        private readonly IUnitOFWork _unitOfWork;

        public LikeResenhaService(ILikeResenhaRepository likeResenhaRepository, IUnitOFWork unitOfWork)
        {
            _likeResenhaRepository = likeResenhaRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<LikeResenha> GetById(int id)
        {
            return await _likeResenhaRepository.GetById(id);
        }

        public async Task<LikeResenha> GetByResenhaUser(string idUser, int idResenha)
        {
            return await _likeResenhaRepository.GetByResenhaUser(idUser, idResenha);
        }

        public async Task<IEnumerable<LikeResenha>> GetByResenha(int idResenha)
        {
            IEnumerable<LikeResenha> baseLikeResenha;
            if (idResenha != null)
            {
                baseLikeResenha = await _likeResenhaRepository.GetByResenha(idResenha);
            }
            else
            {
                baseLikeResenha = null;
            }
            return baseLikeResenha;
        }

        public async Task<IEnumerable<LikeResenha>> GetByUser(string idUser)
        {
            IEnumerable<LikeResenha> baseLikeResenha;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseLikeResenha = await _likeResenhaRepository.GetByUser(idUser);
            }
            else
            {
                baseLikeResenha = null;
            }
            return baseLikeResenha;
        }

        public async Task<LikeResenhaResponse> Create(LikeResenha likeResenha)
        {
            try
            {
                await _likeResenhaRepository.Create(likeResenha);
                await _unitOfWork.CompleteAsync();

                return new LikeResenhaResponse(likeResenha);
            }
            catch (Exception ex)
            {
                return new LikeResenhaResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<LikeResenhaResponse> Update(int id, LikeResenha LikeResenha)
        {
            var LikeResenhaExistente = await _likeResenhaRepository.GetById(id);

            if (LikeResenhaExistente == null)
                return new LikeResenhaResponse("Category not found.");

            try
            {
                _likeResenhaRepository.Update(LikeResenhaExistente);
                await _unitOfWork.CompleteAsync();

                return new LikeResenhaResponse(LikeResenhaExistente);
            }
            catch (Exception ex)
            {
                return new LikeResenhaResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<LikeResenhaResponse> Delete(int id)
        {
            var deleteLikeResenha = await _likeResenhaRepository.GetById(id);

            if (deleteLikeResenha == null)
                return new LikeResenhaResponse("Category not found.");

            try
            {
                _likeResenhaRepository.Delete(deleteLikeResenha);
                await _unitOfWork.CompleteAsync();

                return new LikeResenhaResponse(deleteLikeResenha);
            }
            catch (Exception ex)
            {
                return new LikeResenhaResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
