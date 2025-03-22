using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IMeusLivrosService
    {
        Task<IEnumerable<MeusLivros>> GetByUser(string idUser);
        Task<MeusLivros> GetById(int id);
        Task<bool> GetByIdLivroIdUser(int idLivro, string idUser);
        Task<MeusLivros> GetMeuLivroByIdLivroIdUser(int idLivro, string idUser);
        Task<MeusLivrosResponse> CreateMyLibrary(MeusLivros MeuLivro);
        Task<MeusLivrosResponse> UpdateLido(int id, int Lido);
        Task<MeusLivrosResponse> UpdateRelido(int id, int Relido);
        Task<MeusLivrosResponse> Delete(int id);
    }
}
