using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IPreferenciasRepository
    {
        Task<IEnumerable<Preferencias>> GetByUser(string idUser);
        Task<Preferencias> GetById(int id);
        Task Create(Preferencias preferencias);
        void Delete(Preferencias preferencias);
        void DeleteByUser(string idUser);
    }
}
