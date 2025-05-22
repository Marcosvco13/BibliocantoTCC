using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class DenunciasService : IDenunciasService
    {
        private readonly IDenunciasRepository _denunciasRepository;
        private readonly IUnitOFWork _unitOfWork;

        public DenunciasService(IDenunciasRepository denunciasRepository, IUnitOFWork unitOfWork)
        {
            _denunciasRepository = denunciasRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Denuncias> GetById(int id)
        {
            return await _denunciasRepository.GetById(id);
        }

        public async Task<Denuncias> GetByIdResenhaAndIdUser(int idResenha, string idUser)
        {
            return await _denunciasRepository.GetByIdResenhaAndIdUser(idResenha, idUser);
        }

        public async Task<Denuncias> GetByIdComentarioAndIdUser(int idComentario, string idUser)
        {
            return await _denunciasRepository.GetByIdComentarioAndIdUser(idComentario, idUser);
        }

        public async Task<IEnumerable<Denuncias>> GetAllByUser(string idUser)
        {
            IEnumerable<Denuncias> baseDenuncias;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseDenuncias = await _denunciasRepository.GetAllByUser(idUser);
            }
            else
            {
                baseDenuncias = null;
            }
            return baseDenuncias;
        }

        public async Task<IEnumerable<Denuncias>> GetAllByIdResenha(int idResenha)
        {
            IEnumerable<Denuncias> baseDenuncias;
            if (idResenha != null)
            {
                baseDenuncias = await _denunciasRepository.GetAllByIdResenha(idResenha);
            }
            else
            {
                baseDenuncias = null;
            }
            return baseDenuncias;
        }

        public async Task<IEnumerable<Denuncias>> GetAllByIdComentario(int idComentario)
        {
            IEnumerable<Denuncias> baseDenuncias;
            if (idComentario != null)
            {
                baseDenuncias = await _denunciasRepository.GetAllByIdComentario(idComentario);
            }
            else
            {
                baseDenuncias = null;
            }
            return baseDenuncias;
        }

        public async Task<DenunciasResponse> Create(Denuncias denuncias)
        {
            try
            {
                await _denunciasRepository.Create(denuncias);
                await _unitOfWork.CompleteAsync();

                return new DenunciasResponse(denuncias);
            }
            catch (Exception ex)
            {
                return new DenunciasResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<DenunciasResponse> Update(int id, Denuncias denuncias)
        {
            var denunciaExistente = await _denunciasRepository.GetById(id);

            if (denunciaExistente == null)
                return new DenunciasResponse("Category not found.");

            try
            {
                _denunciasRepository.Update(denunciaExistente);
                await _unitOfWork.CompleteAsync();

                return new DenunciasResponse(denunciaExistente);
            }
            catch (Exception ex)
            {
                return new DenunciasResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<DenunciasResponse> Delete(int id)
        {
            var deleteDenuncia = await _denunciasRepository.GetById(id);

            if (deleteDenuncia == null)
                return new DenunciasResponse("Category not found.");

            try
            {
                _denunciasRepository.Delete(deleteDenuncia);
                await _unitOfWork.CompleteAsync();

                return new DenunciasResponse(deleteDenuncia);
            }
            catch (Exception ex)
            {
                return new DenunciasResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
