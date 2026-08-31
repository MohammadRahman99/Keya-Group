using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Data;
using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Repositories
{
    public class ContactInquiryRepository : Repository<ContactInquiry>, IContactInquiryRepository
    {
        public ContactInquiryRepository(KeyaGroupDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ContactInquiry>> GetRecentInquiriesAsync(int count = 10)
        {
            return await _dbSet
                .OrderByDescending(c => c.SubmittedAt)
                .Take(count)
                .ToListAsync();
        }
    }
}
