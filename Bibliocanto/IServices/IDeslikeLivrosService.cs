using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IDeslikeLivrosService
    {
        Task<IEnumerable<DeslikeLivros>> GetByLivro(int idLivro);
        Task<IEnumerable<DeslikeLivros>> GetByUser(string idUser);
        Task<DeslikeLivros> GetByLikeUser(string idUser, int idLivro);
        Task<DeslikeLivros> GetById(int id);
        Task<DeslikeLivrosResponse> Create(DeslikeLivros deslikeLivros);
        Task<DeslikeLivrosResponse> Update(int id, DeslikeLivros deslikeLivros);
        Task<DeslikeLivrosResponse> Delete(int id);
    }
}
