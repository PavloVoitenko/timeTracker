using Microsoft.EntityFrameworkCore;
using System.Linq;
using TimeTracker.Model.Entities;
using TimeTracker.Model.Entities.Abstractions;

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
            modelBuilder.Entity<User>().HasIndex(u => u.Username);

            modelBuilder.Entity<Project>().HasMany(p => p.Tasks).WithOne(t => t.Project);
            modelBuilder.Entity<User>().HasMany(u => u.Trackings).WithOne(t => t.User);

            AddNamedEntityIndexes(modelBuilder);
        }

        private void AddNamedEntityIndexes(ModelBuilder modelBuilder)
        {
            var genericMethod = typeof(TimeTrackingContext).GetMethod("AddNamedEntityKey", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            var namedProperties = typeof(TimeTrackingContext).GetProperties()
                                .Where(pi =>
                                        pi.PropertyType.IsGenericType &&
                                        pi.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                                        pi.PropertyType.GetGenericArguments().First().IsSubclassOf(typeof(NamedEntity)));
            foreach (var np in namedProperties)
            {
                var genericType = np.PropertyType.GetGenericArguments().FirstOrDefault();
                var entityMethod = genericMethod.MakeGenericMethod(genericType);
                entityMethod.Invoke(this, new[] { modelBuilder });
            }
        }

        private void AddNamedEntityKey<T>(ModelBuilder modelBuilder) where T : NamedEntity
        {
            modelBuilder.Entity<T>().HasIndex(e => e.Name);
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<Tracking> Tracking { get; set; }
        public DbSet<User> User { get; set; }
    }
}
