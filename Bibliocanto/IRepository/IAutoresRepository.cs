using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IAutoresRepository
    {
        Task<IEnumerable<Autores>> ListAsync();
        Task<IEnumerable<Autores>> GetAutorByName(string nome);
        Task CreateAutor(Autores autor);
    }
}
