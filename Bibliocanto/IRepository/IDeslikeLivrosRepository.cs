using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IDeslikeLivrosRepository
    {
        Task<IEnumerable<DeslikeLivros>> GetByLivro(int idLivro);
        Task<IEnumerable<DeslikeLivros>> GetByUser(string idUser);
        Task<DeslikeLivros> GetByLikeUser(string idUser, int idLivro);
        Task<DeslikeLivros> GetById(int id);
        Task Create(DeslikeLivros deslikeLivros);
        void Update(DeslikeLivros deslikeLivros);
        void Delete(DeslikeLivros deslikeLivros);
    }
}
