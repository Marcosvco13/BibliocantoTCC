using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IAutoresLivrosRepository
    {
        Task<IEnumerable<AutoresLivros>> GetByIdLivro(int idLivro);
        Task<IEnumerable<AutoresLivros>> GetByIdAutor(int idAutor);
        Task<AutoresLivros> GetById(int id);
        Task Add(AutoresLivros autoresLivro);
        void Update(AutoresLivros autoresLivro);
        void Delete(AutoresLivros autoresLivro);
    }
}