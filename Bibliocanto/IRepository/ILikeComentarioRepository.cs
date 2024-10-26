using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface ILikeComentarioRepository
    {
        Task<IEnumerable<LikeComentario>> GetByComentario(int idComentario);
        Task<IEnumerable<LikeComentario>> GetByUser(string idUser);
        Task<LikeComentario> GetById(int id);
        Task Create(LikeComentario likeComentario);
        void Update(LikeComentario likeComentario);
        void Delete(LikeComentario likeComentario);
    }
}
