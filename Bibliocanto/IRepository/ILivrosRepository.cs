using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface ILivrosRepository
    {
        Task<IEnumerable<Livros>> GetBaseLivros();
        Task<IEnumerable<Livros>> GetLivrosByNome(string nome);
        Task AddLivro(Livros livro);
    }
}
