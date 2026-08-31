using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        IRepository<Division> Divisions { get; }
        IRepository<NewsArticle> NewsArticles { get; }
        IRepository<JobOpening> JobOpenings { get; }
        IContactInquiryRepository ContactInquiries { get; }
        IRepository<JobApplication> JobApplications { get; }
        
        Task<int> CompleteAsync();
    }
}
