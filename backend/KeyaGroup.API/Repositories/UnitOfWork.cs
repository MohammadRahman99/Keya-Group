using KeyaGroup.API.Data;
using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly KeyaGroupDbContext _context;

        public IProductRepository Products { get; }
        public IRepository<Division> Divisions { get; }
        public IRepository<NewsArticle> NewsArticles { get; }
        public IRepository<JobOpening> JobOpenings { get; }
        public IContactInquiryRepository ContactInquiries { get; }
        public IRepository<JobApplication> JobApplications { get; }

        public UnitOfWork(KeyaGroupDbContext context)
        {
            _context = context;
            Products = new ProductRepository(_context);
            Divisions = new Repository<Division>(_context);
            NewsArticles = new Repository<NewsArticle>(_context);
            JobOpenings = new Repository<JobOpening>(_context);
            ContactInquiries = new ContactInquiryRepository(_context);
            JobApplications = new Repository<JobApplication>(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
