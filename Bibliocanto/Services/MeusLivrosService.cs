using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;

namespace Bibliocanto.Services
{
    public class MeusLivrosService : IMeusLivrosService
    {
        private readonly IMeusLivrosRepository _meusLivrosRepository;
        private readonly IUnitOFWork _unitOfWork;

        public MeusLivrosService(IMeusLivrosRepository meusLivrosRepository, IUnitOFWork unitOfWork)
        {
            _meusLivrosRepository = meusLivrosRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> GetByIdLivroIdUser( int idLivro, string idUser)
        {
            return await _meusLivrosRepository.GetByIdLivroIdUser(idLivro, idUser);
        }
        public async Task<MeusLivros> GetMeuLivroByIdLivroIdUser(int idLivro, string idUser)
        {
            return await _meusLivrosRepository.GetMeuLivroByIdLivroIdUser(idLivro, idUser);
        }

        public async Task<MeusLivros> GetById(int id)
        {
            return await _meusLivrosRepository.GetById(id);
        }

        public async Task<IEnumerable<MeusLivros>> GetByUser(string idUser)
        {
            IEnumerable<MeusLivros> baseMeusLivros;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                baseMeusLivros = await _meusLivrosRepository.GetByUser(idUser);
            }
            else
            {
                baseMeusLivros = null;
            }
            return baseMeusLivros;
        }

        public async Task<MeusLivrosResponse> CreateMyLibrary(MeusLivros meus)
        {
            try
            {
                await _meusLivrosRepository.CreateMyLibrary(meus);
                await _unitOfWork.CompleteAsync();

                return new MeusLivrosResponse(meus);
            }
            catch (Exception ex)
            {
                return new MeusLivrosResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<MeusLivrosResponse> UpdateLido(int id, int lido)
        {
            var meuLivroExistente = await _meusLivrosRepository.GetById(id);

            if (meuLivroExistente == null)
                return new MeusLivrosResponse("Category not found.");

            meuLivroExistente.Lido = lido;

            try
            {
                _meusLivrosRepository.Update(meuLivroExistente);
                await _unitOfWork.CompleteAsync();

                return new MeusLivrosResponse(meuLivroExistente);
            }
            catch (Exception ex)
            {
                return new MeusLivrosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<MeusLivrosResponse> UpdateRelido(int id, int relido)
        {
            var meuLivroExistente = await _meusLivrosRepository.GetById(id);

            if (meuLivroExistente == null)
                return new MeusLivrosResponse("Category not found.");

            meuLivroExistente.Relido = relido;

            try
            {
                _meusLivrosRepository.Update(meuLivroExistente);
                await _unitOfWork.CompleteAsync();

                return new MeusLivrosResponse(meuLivroExistente);
            }
            catch (Exception ex)
            {
                return new MeusLivrosResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<MeusLivrosResponse> Delete(int id)
        {
            var deleteMeuLivro = await _meusLivrosRepository.GetById(id);

            if (deleteMeuLivro == null)
                return new MeusLivrosResponse("Category not found.");

            try
            {
                _meusLivrosRepository.Delete(deleteMeuLivro);
                await _unitOfWork.CompleteAsync();

                return new MeusLivrosResponse(deleteMeuLivro);
            }
            catch (Exception ex)
            {
                return new MeusLivrosResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
