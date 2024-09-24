using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IMeusLivrosService
    {
        Task<IEnumerable<MeusLivros>> GetByUser(string idUser);
        Task<MeusLivros> GetById(int id);
        Task<MeusLivrosResponse> CreateMyLibrary(MeusLivros MeuLivro);
        Task<MeusLivrosResponse> Update(int id, MeusLivros MeuLivro);
        Task<MeusLivrosResponse> Delete(int id);
    }
}
