using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IAvaliacaoRepository
    {
        Task<IEnumerable<Avaliacao>> GetByLivro(int idLivro);
        Task<IEnumerable<Avaliacao>> GetByUser(string idUser);
        Task<Avaliacao> GetById(int id);
        Task Create(Avaliacao avaliacao);
        void Update(Avaliacao avaliacao);
        void Delete(Avaliacao avaliacao);
    }
}
