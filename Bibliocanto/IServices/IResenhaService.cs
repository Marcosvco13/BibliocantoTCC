using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IResenhaService
    {
        Task<IEnumerable<Resenha>> GetByLivro(int idLivro);
        Task<IEnumerable<Resenha>> GetByUser(string idUser);
        Task<Resenha> GetById(int id);
        Task<ResenhaResponse> Create(Resenha resenha);
        Task<ResenhaResponse> Update(int id, Resenha resenha);
        Task<ResenhaResponse> Delete(int id);
    }
}
