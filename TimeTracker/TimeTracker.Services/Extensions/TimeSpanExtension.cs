using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.DTOs;

namespace TimeTracker.Extensons
{
    public static class TimeSpanExtension
    {
        public static TimeDto ToTime(this TimeSpan span)
        {
            return new TimeDto
            {
                Hours = span.Hours,
                Minutes = span.Minutes
            };
        }
    }
}