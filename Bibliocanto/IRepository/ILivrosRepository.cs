using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface ILivrosRepository
    {
        Task<IEnumerable<Livros>> GetBaseLivros();
    }
}
