using GenericRepository.Abstractions.Entities;

using System.Collections.Generic;

namespace TimeTracker.Model.Entities
{
    public class Project : NamedEntityBase
    {
        public virtual IEnumerable<Task> Tasks { get; set; }
    }
}
