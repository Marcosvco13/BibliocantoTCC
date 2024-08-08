using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public interface IEstantesService
    {
        Task<Estantes> GetEstanteUser(string idUser);
        Task CreateEstante(Estantes estante);
        Task UpdateEstante(Estantes estante);
        Task DeleteEstante(Estantes estantes);
    }
}
