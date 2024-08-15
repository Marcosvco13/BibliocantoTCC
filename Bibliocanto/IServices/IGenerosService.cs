using Bibliocanto.Communication;
using Bibliocanto.Models;
using Bibliocanto.Resources;

namespace Bibliocanto.IServices
{
    public interface IGenerosService
    {
        Task<IEnumerable<Generos>> ListAsync();
        Task<IEnumerable<Generos>> GetGeneroByName(string nome);
        Task<Generos> GetById(int id);
        Task<GenerosResponse> CreateGenero(Generos generos);
        Task<GenerosResponse> Update(int id, Generos generos);
        Task<GenerosResponse> Delete(int id);
    }
}
