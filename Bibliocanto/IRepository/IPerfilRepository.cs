using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IPerfilRepository
    {
        Task<Perfil> GetByUser(string idUser);
        Task<Perfil> GetById(int id);
        Task Create(Perfil perfil);
        void Update(Perfil perfil);
        void Delete(Perfil perfil);
    }
}
