using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class PreferenciasService : IPreferenciasService
    {
        private readonly IPreferenciasRepository _preferenciasRepository;
        private readonly IUnitOFWork _unitOfWork;

        public PreferenciasService(IPreferenciasRepository preferenciasRepository, IUnitOFWork unitOfWork)
        {
            _preferenciasRepository = preferenciasRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Preferencias> GetById(int id)
        {
            return await _preferenciasRepository.GetById(id);
        }

        public async Task<IEnumerable<Preferencias>> GetByUser(string idUser)
        {
            IEnumerable<Preferencias> basePreferencias;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                basePreferencias = await _preferenciasRepository.GetByUser(idUser);
            }
            else
            {
                basePreferencias = null;
            }
            return basePreferencias;
        }

        public async Task<PreferenciasResponse> Create(Preferencias preferencias)
        {
            try
            {
                await _preferenciasRepository.Create(preferencias);
                await _unitOfWork.CompleteAsync();

                return new PreferenciasResponse(preferencias);
            }
            catch (Exception ex)
            {
                return new PreferenciasResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<PreferenciasResponse> Delete(int id)
        {
            var deletePreferencia = await _preferenciasRepository.GetById(id);

            if (deletePreferencia == null)
                return new PreferenciasResponse("Category not found.");

            try
            {
                _preferenciasRepository.Delete(deletePreferencia);
                await _unitOfWork.CompleteAsync();

                return new PreferenciasResponse(deletePreferencia);
            }
            catch (Exception ex)
            {
                return new PreferenciasResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
