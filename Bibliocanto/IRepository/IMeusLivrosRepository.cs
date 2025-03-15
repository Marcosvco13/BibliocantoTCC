using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IMeusLivrosRepository
    {
        Task<IEnumerable<MeusLivros>> GetByUser(string idUser);
        Task<MeusLivros> GetById(int id);
        Task<bool> GetByIdLivroIdUser(int idLivro, string idUser);
        Task CreateMyLibrary(MeusLivros meusLivros);
        void Update(MeusLivros meusLivros);
        void Delete(MeusLivros meusLivros);
    }
}
