using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class LikeComentarioService : ILikeComentarioService
    {
        private readonly ILikeComentarioRepository _likeComentarioRepository;
        private readonly IUnitOFWork _unitOfWork;

        public LikeComentarioService(ILikeComentarioRepository likeComentarioRepository, IUnitOFWork unitOfWork)
        {
            _likeComentarioRepository = likeComentarioRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<LikeComentario> GetById(int id)
        {
            return await _likeComentarioRepository.GetById(id);
        }

        public async Task<LikeComentario> GetByComentarioUser(string idUser, int idComentario)
        {
            return await _likeComentarioRepository.GetByComentarioUser(idUser, idComentario);
        }

        public async Task<IEnumerable<LikeComentario>> GetByComentario(int idComentario)
        {
            IEnumerable<LikeComentario> baseLikeComentario;
            if (idComentario != null)
            {
                baseLikeComentario = await _likeComentarioRepository.GetByComentario(idComentario);
            }
            else
            {
                baseLikeComentario = null;
            }
            return baseLikeComentario;
        }

        public async Task<IEnumerable<LikeComentario>> GetByUser(string idUser)
        {
            IEnumerable<LikeComentario> baseLikeComentario;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseLikeComentario = await _likeComentarioRepository.GetByUser(idUser);
            }
            else
            {
                baseLikeComentario = null;
            }
            return baseLikeComentario;
        }

        public async Task<LikeComentarioResponse> Create(LikeComentario LikeComentario)
        {
            try
            {
                await _likeComentarioRepository.Create(LikeComentario);
                await _unitOfWork.CompleteAsync();

                return new LikeComentarioResponse(LikeComentario);
            }
            catch (Exception ex)
            {
                return new LikeComentarioResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<LikeComentarioResponse> Update(int id, LikeComentario LikeComentario)
        {
            var LikeComentarioExistente = await _likeComentarioRepository.GetById(id);

            if (LikeComentarioExistente == null)
                return new LikeComentarioResponse("Category not found.");

            try
            {
                _likeComentarioRepository.Update(LikeComentarioExistente);
                await _unitOfWork.CompleteAsync();

                return new LikeComentarioResponse(LikeComentarioExistente);
            }
            catch (Exception ex)
            {
                return new LikeComentarioResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<LikeComentarioResponse> Delete(int id)
        {
            var deleteLikeComentario = await _likeComentarioRepository.GetById(id);

            if (deleteLikeComentario == null)
                return new LikeComentarioResponse("Category not found.");

            try
            {
                _likeComentarioRepository.Delete(deleteLikeComentario);
                await _unitOfWork.CompleteAsync();

                return new LikeComentarioResponse(deleteLikeComentario);
            }
            catch (Exception ex)
            {
                return new LikeComentarioResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
