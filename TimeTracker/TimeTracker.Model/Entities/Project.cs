using System.Collections.Generic;
using TimeTracker.Model.Entities.Abstractions;

namespace TimeTracker.Model.Entities
{
    public class Project : NamedEntity
    {
        public virtual IEnumerable<Task> Tasks { get; set; }
    }
}
