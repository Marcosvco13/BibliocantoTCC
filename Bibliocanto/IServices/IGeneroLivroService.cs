using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IGeneroLivroService
    {
        Task<IEnumerable<GeneroLivro>> GetByIdLivro(int idLivro);
        Task<GeneroLivro> GetById(int id);
        Task<GeneroLivroResponse> Add(GeneroLivro generoLivro);
        Task<GeneroLivroResponse> Update(int id, GeneroLivro generoLivro);
        Task<GeneroLivroResponse> Delete(int id);
    }
}
