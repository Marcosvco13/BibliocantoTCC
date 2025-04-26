using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IDenunciasRepository
    {
        Task<Denuncias> GetById(int id);
        Task<IEnumerable<Denuncias>> GetAllByUser(string IdUser);
        Task<IEnumerable<Denuncias>> GetAllByIdResenha(int idResenha);
        Task<IEnumerable<Denuncias>> GetAllByIdComentario(int idComentario);
        Task Create (Denuncias denuncias);
        void Update (Denuncias denuncias);
        void Delete(Denuncias denuncias);

    }
}
