using Bibliocanto.Communication;
using Bibliocanto.Models;

namespace Bibliocanto.IServices
{
    public interface IEditorasService
    {
        Task<IEnumerable<Editoras>> ListAsync();
        Task<IEnumerable<Editoras>> GetEditoraByName(string nome);
        Task<Editoras> GetById(int id);
        Task<EditorasResponse> CreateEditora(Editoras editora);
        Task<EditorasResponse> Update(int id, Editoras editora);
        Task<EditorasResponse> Delete(int id);
    }
}
