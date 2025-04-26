using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IDenunciasService
    {
        Task<Denuncias> GetById(int id);
        Task<IEnumerable<Denuncias>> GetAllByUser(string IdUser);
        Task<IEnumerable<Denuncias>> GetAllByIdResenha(int idResenha);
        Task<IEnumerable<Denuncias>> GetAllByIdComentario(int idComentario);
        Task<DenunciasResponse> Create(Denuncias denuncias);
        Task<DenunciasResponse> Update(int id, Denuncias denuncias);
        Task<DenunciasResponse> Delete(int id);
    }
}
