using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace TimeTracker.Model
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<TimeTrackingContext>
    {
        public static TimeTrackingContext GetContext()
        {
            return new DesignTimeDbContextFactory().CreateDbContext(null);
        }

        public TimeTrackingContext CreateDbContext(string[] args)
        {
            var configRoot = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var builder = new DbContextOptionsBuilder<TimeTrackingContext>();
            var connectionString = configRoot.GetConnectionString("LocalDB");
            builder.UseSqlServer(connectionString);

            return new TimeTrackingContext(builder.Options);
        }
    }
}
