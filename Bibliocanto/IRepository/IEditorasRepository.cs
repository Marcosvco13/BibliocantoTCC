using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IEditorasRepository
    {
        Task<IEnumerable<Editoras>> ListAsync();
        Task<Editoras> GetById(int id);
        Task<IEnumerable<Editoras>> GetEditoraByName(string nome);
        Task CreateEditora(Editoras editora);
        void Update(Editoras editora);
        void Delete(Editoras editora);
    }
}
