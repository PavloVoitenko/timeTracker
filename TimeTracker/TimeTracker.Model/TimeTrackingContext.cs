using GenericRepository.Helpers;
using TimeTracker.Model.Entities;

using Microsoft.EntityFrameworkCore;

namespace TimeTracker.Model
{
    public class TimeTrackingContext : DbContext
    {
        public TimeTrackingContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().HasIndex(t => t.ProjectId);
            modelBuilder.Entity<Tracking>().HasIndex(t => new { t.TaskId, t.UserId });

            modelBuilder.Entity<Project>().HasMany(p => p.Tasks).WithOne(t => t.Project);
            modelBuilder.Entity<User>().HasMany(u => u.Trackings).WithOne(t => t.User);
            modelBuilder.Entity<User>().HasMany(u => u.RefreshTokens).WithOne(ur => ur.User);

            IndexHelper.BuildIndexes<TimeTrackingContext>(modelBuilder);
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<Tracking> Tracking { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRefresh> UserRefresh { get; set; }
    }
}
