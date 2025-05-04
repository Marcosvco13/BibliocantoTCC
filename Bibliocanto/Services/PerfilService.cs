using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

namespace Bibliocanto.Services
{
    public class PerfilService : IPerfilService
    {
        private readonly IPerfilRepository _perfilRepository;
        private readonly IUnitOFWork _unitOfWork;

        public PerfilService(IPerfilRepository perfilRepository, IUnitOFWork unitOfWork)
        {
            _perfilRepository = perfilRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Perfil> GetById(int id)
        {
            return await _perfilRepository.GetById(id);
        }

        public async Task<Perfil> GetByUser(string idUser)
        {
            Perfil userPerfil;
            if (!string.IsNullOrWhiteSpace(idUser))
            {
                userPerfil = await _perfilRepository.GetByUser(idUser);
            }
            else
            {
                userPerfil = null;
            }
            return userPerfil;
        }

        public async Task<PerfilResponse> Create(Perfil perfil)
        {
            try
            {
                await _perfilRepository.Create(perfil);
                await _unitOfWork.CompleteAsync();

                return new PerfilResponse(perfil);
            }
            catch (Exception ex)
            {
                return new PerfilResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<PerfilResponse> Update(int id, Perfil perfil)
        {
            var perfilUser = await _perfilRepository.GetById(id);

            if (perfilUser == null)
                return new PerfilResponse("Perfil não encontrado."); // Mudei a mensagem para ser mais específica

            try
            {
                // Atualiza as propriedades do perfil existente com os novos valores
                perfilUser.Nome = perfil.Nome;
                perfilUser.Apelido = perfil.Apelido;
                perfilUser.Descricao = perfil.Descricao;
                perfilUser.DataNasc = perfil.DataNasc;
                // Adicione outras propriedades que precisam ser atualizadas

                _perfilRepository.Update(perfilUser); // Agora sim está atualizando com os novos valores
                await _unitOfWork.CompleteAsync();

                return new PerfilResponse(perfilUser);
            }
            catch (Exception ex)
            {
                return new PerfilResponse($"Ocorreu um erro ao atualizar o perfil: {ex.Message}"); // Mensagem mais específica
            }
        }

        public async Task<PerfilResponse> Delete(int id)
        {
            var deletarPerfil = await _perfilRepository.GetById(id);

            if (deletarPerfil == null)
                return new PerfilResponse("Category not found.");

            try
            {
                _perfilRepository.Delete(deletarPerfil);
                await _unitOfWork.CompleteAsync();

                return new PerfilResponse(deletarPerfil);
            }
            catch (Exception ex)
            {
                return new PerfilResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
