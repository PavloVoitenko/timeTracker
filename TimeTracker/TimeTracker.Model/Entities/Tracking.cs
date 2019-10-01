using System;
using TimeTracker.Model.Entities.Abstractions;

namespace TimeTracker.Model.Entities
{
    public class Tracking : EntityBase
    {
        public DateTime TrackingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public virtual Task Task { get; set; }
        public virtual User User { get; set; }
    }
}
