using System.Threading.Tasks;
using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IAutoresService
    {
        Task<IEnumerable<Autores>> ListAsync();
        Task<IEnumerable<Autores>> GetAutorByName(string nome);
        Task<Autores> GetById(int id);
        Task<AutoresResponse> CreateAutor(Autores autor);
        Task<AutoresResponse> Update(int id, Autores autor);
        Task<AutoresResponse> Delete(int id);
    }
}
