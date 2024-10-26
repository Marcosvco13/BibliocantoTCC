using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface ILikeResenhaService
    {
        Task<IEnumerable<LikeResenha>> GetByResenha(int idResenha);
        Task<IEnumerable<LikeResenha>> GetByUser(string idUser);
        Task<LikeResenha> GetById(int id);
        Task<LikeResenhaResponse> Create(LikeResenha likeResenha);
        Task<LikeResenhaResponse> Update(int id, LikeResenha likeResenha);
        Task<LikeResenhaResponse> Delete(int id);
    }
}
