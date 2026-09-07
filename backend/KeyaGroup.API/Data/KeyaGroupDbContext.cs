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
        public DbSet<User> Users => Set<User>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Subcategory> Subcategories => Set<Subcategory>();
        public DbSet<ProductInquiry> ProductInquiries => Set<ProductInquiry>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Division>()
                .HasIndex(d => d.Slug)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Slug)
                .IsUnique();

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Subcategories)
                .WithOne(s => s.Category)
                .HasForeignKey(s => s.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
