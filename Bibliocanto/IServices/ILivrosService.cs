using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface ILivrosService
    {
        Task<IEnumerable<Livros>> GetBaseLivros();
        Task<Livros> GetLivroById(int id);
        Task<IEnumerable<Livros>> GetLivroByNome(string nome);
        Task<SaveLivrosResponse> AddLivro(Livros livro);
        Task<SaveLivrosResponse> UpdateLivro(int id, Livros livro);
        //Task DeleteLivro(Livros livro);
    }
}