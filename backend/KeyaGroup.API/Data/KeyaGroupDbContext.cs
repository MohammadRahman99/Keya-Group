using Microsoft.EntityFrameworkCore;
using KeyaGroup.API.Entities;

namespace KeyaGroup.API.Data
{
    public class KeyaGroupDbContext : DbContext
    {
        public KeyaGroupDbContext(DbContextOptions<KeyaGroupDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Division> Divisions => Set<Division>();
        public DbSet<NewsArticle> NewsArticles => Set<NewsArticle>();
        public DbSet<JobOpening> JobOpenings => Set<JobOpening>();
        public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();
        public DbSet<JobApplication> JobApplications => Set<JobApplication>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Division>()
                .HasIndex(d => d.Slug)
                .IsUnique();
        }
    }
}
