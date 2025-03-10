using DemoProject.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DemoProject.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<Card>().HasData(
                new Card { Id = 1, Title = "Kart 1", Description = "Bu bir test kartıdır", CreatedDate = new System.DateTime(2024, 3, 2, 0, 0, 0, System.DateTimeKind.Utc) },
                new Card { Id = 2, Title = "Kart 2", Description = "Bu başka bir test kartıdır", CreatedDate = new System.DateTime(2024, 3, 2, 0, 0, 0, System.DateTimeKind.Utc) }
            );
        }
    }
} 