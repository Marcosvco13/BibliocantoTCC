using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IPreferenciasService
    {
        Task<IEnumerable<Preferencias>> GetByUser(string idUser);
        Task<Preferencias> GetById(int id);
        Task<PreferenciasResponse> Create(Preferencias preferencias);
        Task<PreferenciasResponse> Delete(int id);
        Task<PreferenciasResponse> DeleteByUser(string idUser);
    }
}
