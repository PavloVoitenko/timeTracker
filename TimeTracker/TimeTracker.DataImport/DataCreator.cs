using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using TimeTracker.DataImport.Models;
using TimeTracker.Model;
using TimeTracker.Model.Entities;

namespace TimeTracker.DataImport
{
    class DataCreator
    {
        private readonly string _projectName;
        private readonly TimeTrackingContext _db = DesignTimeDbContextFactory.GetContext();

        private User _user;
        private Project _project;

        public DataCreator(string userName, string projectName)
        {
            _projectName = projectName;
            _user = _db.User.FirstOrDefault(u => u.Username == userName);

            if (_user == null)
            {
                throw new Exception("User was not found");
            }
        }

        public void Create(ExportLine line)
        {
            if (_project == null)
            {
                FindOrCreateProject();
            }

            var task = FindOrCreateTask(string.IsNullOrEmpty(line.TaskNumber) ? line.TaskName : line.TaskNumber, line.TaskType, line.Description);
            CreateTracking(task, line.Date, line.StartTime, line.EndTime, line.Duration);

            _db.SaveChanges();
        }

        private void FindOrCreateProject()
        {
            var project = _db.Project.FirstOrDefault(p => p.Name == _projectName);

            if (project == null)
            {
                project = new Project
                {
                    Name = _projectName
                };

                _db.Add(project);
            }

            _project = project;
        }

        private Task FindOrCreateTask(string taskName, TaskType type, string taskDescription)
        {
            var task = _db.Task.Include(t => t.Project).FirstOrDefault(t => t.Name == taskName && t.Project.Name == _project.Name);

            if (task == null)
            {
                task = new Task
                {
                    Name = taskName,
                    Type = type,
                    Description = taskDescription,
                    Project = _project
                };

                _db.Add(task);
            }

            return task;
        }

        private void CreateTracking(Task task, DateTime date, TimeSpan startTime, TimeSpan endTime, TimeSpan duration)
        {
            if (startTime == TimeSpan.MinValue && endTime == TimeSpan.MinValue)
            {
                startTime = new TimeSpan(9, 0, 0);

                var previousTracking = _db.Tracking
                    .Include(t => t.Task)
                    .Include(t => t.User)
                    .Where(t => t.User.Username == _user.Username && t.TrackingDate == date)
                    .OrderByDescending(t => t.EndTime).FirstOrDefault();

                if (previousTracking != null)
                {
                    startTime = previousTracking.EndTime;
                }

                endTime = startTime.Add(duration);
            }

            var tracking = new Tracking
            {
                User = _user,
                Task = task,
                TrackingDate = date,
                StartTime = startTime,
                EndTime = endTime
            };

            _db.Add(tracking);
        }
    }
}
