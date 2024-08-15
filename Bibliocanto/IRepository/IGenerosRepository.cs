using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IGenerosRepository
    {
        Task<IEnumerable<Generos>> ListAsync();
        Task<Generos> GetById(int id);
        Task<IEnumerable<Generos>> GetGeneroByName(string nome);
        Task CreateGenero(Generos genero);
        void Update(Generos genero);
        void Delete(Generos genero);
    }
}
