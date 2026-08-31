using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Data;
using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(KeyaGroupDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
        {
            if (string.Equals(category, "all", StringComparison.OrdinalIgnoreCase))
            {
                return await GetAllAsync();
            }
            return await _dbSet
                .Where(p => p.Category.ToLower() == category.ToLower())
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return await GetAllAsync();
            }

            var q = query.ToLower();
            return await _dbSet
                .Where(p => p.Name.ToLower().Contains(q) || p.Description.ToLower().Contains(q))
                .ToListAsync();
        }
    }
}
