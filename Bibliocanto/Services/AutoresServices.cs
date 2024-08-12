using System.Globalization;
using Bibliocanto.Communication;
using Bibliocanto.IRepository;
using Bibliocanto.IServices;
using Bibliocanto.Models;
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

        public async Task<SaveAutoresResponse> CreateAutor(Autores autor)
        {
            try
            {
                await _autoresRepository.CreateAutor(autor);
                await _unitOfWork.CompleteAsync();

                return new SaveAutoresResponse(autor);
            }
            catch (Exception ex)
            {
                return new SaveAutoresResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }
    }
}
