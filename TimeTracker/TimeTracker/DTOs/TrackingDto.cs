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
        public TimeDto StartTime { get; set; }
        public TimeDto EndTime { get; set; }
    }

    public class TimeDto
    {
        public int Hours { get; set; }
        public int Minutes { get; set; }

        public TimeSpan ToSpan()
        {
            return new TimeSpan(Hours, Minutes, 0);
        }
    }
}