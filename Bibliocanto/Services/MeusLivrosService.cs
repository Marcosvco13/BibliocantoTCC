﻿using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Repository;

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

        public async Task<MeusLivrosResponse> Update(int id, MeusLivros meus)
        {
            var meuLivroExistente = await _meusLivrosRepository.GetById(id);

            if (meuLivroExistente == null)
                return new MeusLivrosResponse("Category not found.");

            meuLivroExistente.Livros.Titulo = meus.Livros.Titulo;

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
