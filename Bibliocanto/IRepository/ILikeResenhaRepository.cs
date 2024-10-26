using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface ILikeResenhaRepository
    {
        Task<IEnumerable<LikeResenha>> GetByResenha(int idResenha);
        Task<IEnumerable<LikeResenha>> GetByUser(string idUser);
        Task<LikeResenha> GetById(int id);
        Task Create(LikeResenha likeResenha);
        void Update(LikeResenha likeResenha);
        void Delete(LikeResenha likeResenha);
    }
}
