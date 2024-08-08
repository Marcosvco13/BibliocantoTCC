using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public interface ILivrosService
    {
        Task<IEnumerable<Livros>> GetBaseLivros();
        Task<Livros> GetBaseLivro(int id);
        Task<IEnumerable<Livros>> GetLivroByNome(string nome);
        Task CreateLivro(Livros livro);
        Task UpdateLivro(Livros livro);
        Task DeleteLivro(Livros livro);
    }
}