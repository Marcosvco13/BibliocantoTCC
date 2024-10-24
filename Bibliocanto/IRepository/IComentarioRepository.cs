using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IComentarioRepository
    {
        Task<IEnumerable<Comentarios>> GetByResenha(int idResenha);
        Task<IEnumerable<Comentarios>> GetByUser(string idUser);
        Task<Comentarios> GetById(int id);
        Task CreateMyLibrary(Comentarios comentarios);
        void Update(Comentarios comentarios);
        void Delete(Comentarios comentarios);
    }
}
