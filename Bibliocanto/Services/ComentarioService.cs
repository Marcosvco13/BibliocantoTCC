using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class ComentarioService : IComentarioService
    {
        private readonly IComentarioRepository _comentarioRepository;
        private readonly IUnitOFWork _unitOfWork;

        public ComentarioService(IComentarioRepository ComentariosRepository, IUnitOFWork unitOfWork)
        {
            _comentarioRepository = ComentariosRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Comentarios> GetById(int id)
        {
            return await _comentarioRepository.GetById(id);
        }

        public async Task<Comentarios> GetByResenhaUser(string idUser, int idResenha)
        {
            return await _comentarioRepository.GetByResenhaUser(idUser, idResenha);
        }

        public async Task<IEnumerable<Comentarios>> GetByResenha(int idResenha)
        {
            IEnumerable<Comentarios> baseComentarios;
            if (idResenha != null)
            {
                baseComentarios = await _comentarioRepository.GetByResenha(idResenha);
            }
            else
            {
                baseComentarios = null;
            }
            return baseComentarios;
        }

        public async Task<IEnumerable<Comentarios>> GetByUser(string idUser)
        {
            IEnumerable<Comentarios> baseComentarios;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseComentarios = await _comentarioRepository.GetByUser(idUser);
            }
            else
            {
                baseComentarios = null;
            }
            return baseComentarios;
        }

        public async Task<ComentarioResponse> Create(Comentarios Comentarios)
        {
            try
            {
                await _comentarioRepository.Create(Comentarios);
                await _unitOfWork.CompleteAsync();

                return new ComentarioResponse(Comentarios);
            }
            catch (Exception ex)
            {
                return new ComentarioResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<ComentarioResponse> Update(int id, Comentarios Comentarios)
        {
            var ComentariosExistente = await _comentarioRepository.GetById(id);

            if (ComentariosExistente == null)
                return new ComentarioResponse("Category not found.");

            ComentariosExistente.TextoComent = Comentarios.TextoComent;
            ComentariosExistente.IdResenha = Comentarios.IdResenha;
            ComentariosExistente.IdUser = Comentarios.IdUser;

            try
            {
                _comentarioRepository.Update(ComentariosExistente);
                await _unitOfWork.CompleteAsync();

                return new ComentarioResponse(ComentariosExistente);
            }
            catch (Exception ex)
            {
                return new ComentarioResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<ComentarioResponse> Delete(int id)
        {
            var deleteComentarios = await _comentarioRepository.GetById(id);

            if (deleteComentarios == null)
                return new ComentarioResponse("Category not found.");

            try
            {
                _comentarioRepository.Delete(deleteComentarios);
                await _unitOfWork.CompleteAsync();

                return new ComentarioResponse(deleteComentarios);
            }
            catch (Exception ex)
            {
                return new ComentarioResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
