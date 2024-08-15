using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface ILivrosService
    {
        Task<IEnumerable<Livros>> GetBaseLivros();
        Task<Livros> GetLivroById(int id);
        Task<IEnumerable<Livros>> GetLivroByNome(string nome);
        Task<LivrosResponse> AddLivro(Livros livro);
        Task<LivrosResponse> UpdateLivro(int id, Livros livro);
        Task<LivrosResponse> Delete(int id);
    }
}