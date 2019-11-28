using System.Collections.Generic;
using TimeTracker.Model.Entities.Abstractions;

namespace TimeTracker.Model.Entities
{
    public class Task : NamedEntity
    {
        public int ProjectId { get; set; }
        public string Description { get; set; }
        public TaskType Type { get; set; }

        public virtual Project Project { get; set; }
        public virtual IEnumerable<Tracking> Trackings { get; set; }
    }

    public enum TaskType
    {
        Unknown,
        Development,
        Testing,
        Investigation,
        Design,
        Estimate,
        Meeting,
        DevOperations
    }

}
