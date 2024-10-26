using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IAvaliacaoService
    {
        Task<IEnumerable<Avaliacao>> GetByLivro(int idLivro);
        Task<IEnumerable<Avaliacao>> GetByUser(string idUser);
        Task<Avaliacao> GetById(int id);
        Task<AvaliacaoResponse> Create(Avaliacao avaliacao);
        Task<AvaliacaoResponse> Update(int id, Avaliacao avaliacao);
        Task<AvaliacaoResponse> Delete(int id);
    }
}
