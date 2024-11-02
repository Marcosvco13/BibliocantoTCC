using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IComentarioService
    {
        Task<IEnumerable<Comentarios>> GetByResenha(int idResenha);
        Task<IEnumerable<Comentarios>> GetByUser(string idUser);
        Task<Comentarios> GetByResenhaUser(string idUser, int idResenha);
        Task<Comentarios> GetById(int id);
        Task<ComentarioResponse> Create(Comentarios comentarios);
        Task<ComentarioResponse> Update(int id, Comentarios comentarios);
        Task<ComentarioResponse> Delete(int id);
    }
}
