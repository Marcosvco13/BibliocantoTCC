using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface ILikeLivrosService
    {
        Task<IEnumerable<LikeLivros>> GetByLivro(int idLivro);
        Task<IEnumerable<LikeLivros>> GetByUser(string idUser);
        Task<LikeLivros> GetByLikeUser(string idUser, int idLivro);
        Task<LikeLivros> GetById(int id);
        Task<LikeLivrosResponse> Create(LikeLivros likeLivros);
        Task<LikeLivrosResponse> Update(int id, LikeLivros likeLivros);
        Task<LikeLivrosResponse> Delete(int id);
    }
}
