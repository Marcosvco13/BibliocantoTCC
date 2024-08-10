using Bibliocanto.Context;
using Bibliocanto.IRepository;

namespace Bibliocanto.Repository
{
    public class UnitOfWork : IUnitOFWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
