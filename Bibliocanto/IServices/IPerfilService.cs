using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IPerfilService
    {
        Task<Perfil> GetByUser(string idUser);
        Task<Perfil> GetById(int id);
        Task<PerfilResponse> Create(Perfil perfil);
        Task<PerfilResponse> Update(int id, Perfil perfil);
        Task<PerfilResponse> Delete(int id);
    }
}
