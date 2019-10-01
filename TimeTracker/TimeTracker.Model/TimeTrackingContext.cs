using Microsoft.EntityFrameworkCore;
using TimeTracker.Model.Entities;

namespace TimeTracker.Model
{
    public class TimeTrackingContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<Tracking> Tracking { get; set; }
        public DbSet<User> User { get; set; }
    }
}
