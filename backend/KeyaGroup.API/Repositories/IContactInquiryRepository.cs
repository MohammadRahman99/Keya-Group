using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Repositories
{
    public interface IContactInquiryRepository : IRepository<ContactInquiry>
    {
        Task<IEnumerable<ContactInquiry>> GetRecentInquiriesAsync(int count = 10);
    }
}
