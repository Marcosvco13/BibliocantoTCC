﻿using Bibliocanto.Models;

namespace Bibliocanto.IRepository
{
    public interface IResenhaRepository
    {
        Task<IEnumerable<Resenha>> GetByLivro(int idLivro);
        Task<IEnumerable<Resenha>> GetByUser(string idUser);
        Task<Resenha> GetById(int id);
        Task Create(Resenha resenha);
        void Update(Resenha resenha);
        void Delete(Resenha resenha);
    }
}
