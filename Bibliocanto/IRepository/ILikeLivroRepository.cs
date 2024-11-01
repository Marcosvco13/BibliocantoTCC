using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface ILikeLivroRepository
    {
        Task<IEnumerable<LikeLivros>> GetByLivro(int idLivro);
        Task<IEnumerable<LikeLivros>> GetByUser(string idUser);
        Task<LikeLivros> GetByLikeUser(string idUser, int idLivro);
        Task<LikeLivros> GetById(int id);
        Task Create(LikeLivros likeLivros);
        void Update(LikeLivros likeLivros);
        void Delete(LikeLivros likeLivros);
    }
}
