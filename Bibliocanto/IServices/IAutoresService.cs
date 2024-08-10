using System.Threading.Tasks;
using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IAutoresService
    {
        Task<IEnumerable<Autores>> ListAsync();
        Task<IEnumerable<Autores>> GetAutorByName(string nome);
        Task<SaveAutoresResponse> CreateAutor(Autores autor);
    }
}
