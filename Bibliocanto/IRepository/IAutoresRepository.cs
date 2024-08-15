using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IAutoresRepository
    {
        Task<IEnumerable<Autores>> ListAsync();
        Task<Autores> GetById(int id);
        Task<IEnumerable<Autores>> GetAutorByName(string nome);
        Task CreateAutor(Autores autor);
        void Update(Autores autor);
        void Delete(Autores autor);
    }
}
