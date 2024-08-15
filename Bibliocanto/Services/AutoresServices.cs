using System.Globalization;
using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
using Bibliocanto.Resources;
using Microsoft.EntityFrameworkCore;

namespace Bibliocanto.Services
{
    public class AutoresServices : IAutoresService
    {
        private readonly IAutoresRepository _autoresRepository;
        private readonly IUnitOFWork _unitOfWork;

        public AutoresServices(IAutoresRepository autoresRepository, IUnitOFWork unitOfWork)
        {
            _autoresRepository = autoresRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Autores>> ListAsync()
        {
            return await _autoresRepository.ListAsync();
        }

        public async Task<IEnumerable<Autores>> GetAutorByName(string nome)
        {
            IEnumerable<Autores> baseAutores;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                baseAutores = await _autoresRepository.GetAutorByName(nome);
            }
            else
            {
                baseAutores = await ListAsync();
            }
            return baseAutores;
        }
        public async Task<Autores> GetById(int id)
        {
            return await _autoresRepository.GetById(id);
        }

        public async Task<AutoresResponse> CreateAutor(Autores autor)
        {
            try
            {
                await _autoresRepository.CreateAutor(autor);
                await _unitOfWork.CompleteAsync();

                return new AutoresResponse(autor);
            }
            catch (Exception ex)
            {
                return new AutoresResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<AutoresResponse> Update(int id, Autores autor)
        {
            var autorExistente = await _autoresRepository.GetById(id);

            if (autorExistente == null)
                return new AutoresResponse("Category not found.");

            autorExistente.NomeAutor = autor.NomeAutor;

            try
            {
                _autoresRepository.Update(autorExistente);
                await _unitOfWork.CompleteAsync();

                return new AutoresResponse(autorExistente);
            }
            catch (Exception ex)
            {
                return new AutoresResponse($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<AutoresResponse> Delete(int id)
        {
            var existingCategory = await _autoresRepository.GetById(id);

            if (existingCategory == null)
                return new AutoresResponse("Category not found.");

            try
            {
                _autoresRepository.Delete(existingCategory);
                await _unitOfWork.CompleteAsync();

                return new AutoresResponse(existingCategory);
            }
            catch (Exception ex)
            {
                return new AutoresResponse($"An error occurred when deleting the category: {ex.Message}");
            }
        }
    }
}
