using System;
using TimeTracker.Model.Entities;

namespace TimeTracker.DataImport.Models
{
    class ExportLine
    {
        public TaskType TaskType { get; set; }
        public string TaskName { get; set; } = "Unknown";
        public string TaskNumber { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; } = TimeSpan.MinValue;
        public TimeSpan EndTime { get; set; } = TimeSpan.MinValue;
        public TimeSpan Duration { get; set; } = TimeSpan.MinValue;

        public bool Valid => (StartTime != TimeSpan.MinValue && EndTime != TimeSpan.MinValue) || Duration != TimeSpan.MinValue;

        public ExportLine(DateTime date)
        {
            Date = date;
        }
    }
}
