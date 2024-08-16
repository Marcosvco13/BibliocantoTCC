using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public class EditorasServices : IEditorasService
    {
        private readonly IEditorasRepository _editoraRepository;
        private readonly IUnitOFWork _unitOfWork;

        public EditorasServices(IEditorasRepository editoraRepository, IUnitOFWork unitOfWork)
        {
            _editoraRepository = editoraRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Editoras>> ListAsync()
        {
            return await _editoraRepository.ListAsync();
        }

        public async Task<IEnumerable<Editoras>> GetEditoraByName(string nome)
        {
            IEnumerable<Editoras> baseEditoras;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                baseEditoras = await _editoraRepository.GetEditoraByName(nome);
            }
            else
            {
                baseEditoras = await ListAsync();
            }
            return baseEditoras;
        }
        public async Task<Editoras> GetById(int id)
        {
            return await _editoraRepository.GetById(id);
        }

        public async Task<EditorasResponse> CreateEditora(Editoras editora)
        {
            try
            {
                await _editoraRepository.CreateEditora(editora);
                await _unitOfWork.CompleteAsync();

                return new EditorasResponse(editora);
            }
            catch (Exception ex)
            {
                return new EditorasResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<EditorasResponse> Update(int id, Editoras editora)
        {
            var editoraExistente = await _editoraRepository.GetById(id);

            if (editoraExistente == null)
                return new EditorasResponse("Category not found.");

            editoraExistente.NomeEditora = editora.NomeEditora;

            try
            {
                _editoraRepository.Update(editoraExistente);
                await _unitOfWork.CompleteAsync();

                return new EditorasResponse(editoraExistente);
            }
            catch (Exception ex)
            {
                return new EditorasResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<EditorasResponse> Delete(int id)
        {
            var existingEditora = await _editoraRepository.GetById(id);

            if (existingEditora == null)
                return new EditorasResponse("Category not found.");

            try
            {
                _editoraRepository.Delete(existingEditora);
                await _unitOfWork.CompleteAsync();

                return new EditorasResponse(existingEditora);
            }
            catch (Exception ex)
            {
                return new EditorasResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
