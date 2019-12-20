using GenericRepository.Abstractions.Entities;

using System.Collections.Generic;

namespace TimeTracker.Model.Entities
{
    public class User : NamedEntityBase
    {
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public IEnumerable<Tracking> Trackings { get; set; }
    }
}
