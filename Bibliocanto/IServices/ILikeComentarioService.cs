using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface ILikeComentarioService
    {
        Task<IEnumerable<LikeComentario>> GetByComentario(int idComentario);
        Task<IEnumerable<LikeComentario>> GetByUser(string idUser);
        Task<LikeComentario> GetById(int id);
        Task<LikeComentarioResponse> Create(LikeComentario likeComentario);
        Task<LikeComentarioResponse> Update(int id, LikeComentario likeComentario);
        Task<LikeComentarioResponse> Delete(int id);
    }
}
