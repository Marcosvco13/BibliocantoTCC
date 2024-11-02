using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IGenerosLivrosRepository
    {
        Task<IEnumerable<GeneroLivro>> GetByIdLivro(int idLivro);
        Task<GeneroLivro> GetById(int id);
        Task Add(GeneroLivro generoLivro);
        void Update(GeneroLivro generoLivro);
        void Delete(GeneroLivro generoLivro);
    }
}