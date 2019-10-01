using System.Collections.Generic;
using TimeTracker.Model.Entities.Abstractions;

namespace TimeTracker.Model.Entities
{
    public class User : EntityBase
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public IEnumerable<Tracking> Trackings { get; set; }
    }
}
