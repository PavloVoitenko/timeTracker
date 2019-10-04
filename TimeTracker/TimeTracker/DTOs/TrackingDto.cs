using System;
using TimeTracker.Model.Entities;

namespace TimeTracker.DTOs
{
    public class TrackingDto
    {
        public int? TrackingId { get; set; }
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public TaskType TaskType { get; set; }
        public DateTime TrackingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
