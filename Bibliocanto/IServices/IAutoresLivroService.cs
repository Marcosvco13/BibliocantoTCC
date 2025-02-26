using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IAutoresLivroService
    {
        Task<IEnumerable<AutoresLivros>> GetByIdLivro(int idLivro);
        Task<IEnumerable<AutoresLivros>> GetByIdAutor(int idAutor);
        Task<AutoresLivros> GetById(int id);
        Task<AutoresLivroResponse> Add(AutoresLivros autoresLivro);
        Task<AutoresLivroResponse> Update(int id, AutoresLivros autoresLivro);
        Task<AutoresLivroResponse> Delete(int id);
    }
}
