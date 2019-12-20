using GenericRepository.Abstractions.Repositories;
using GenericRepository.Unit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity = TimeTracker.Model.Entities;

using TimeTracker.DTOs;
using TimeTracker.Extensons;
using TimeTracker.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace TimeTracker.Services.Trackings
{
    public interface ITrackingService
    {
        IEnumerable<TrackingDto> GetTrackings(string username, DateTime from, DateTime to);
        Task CreateTracking(string username, TrackingDto trackingDto);
        Task DeleteTracking(string username, int trackingId);
    }

    public class TrackingService : ServiceBase, ITrackingService
    {
        public TrackingService(IUnitOfWork unit) : base(unit)
        {
        }

        public IEnumerable<TrackingDto> GetTrackings(string username, DateTime from, DateTime to)
        {
            var repo = Unit.Repo<Entity.Tracking, IDateTimeStateRepository<Entity.Tracking>>();
            var trackings = repo.AsOfRange(from, to);

            return from tracking in trackings
                    join user in Unit.All<Entity.User>()
                        on tracking.UserId equals user.Id
                    where user.Name == username
                    join task in Unit.All<Entity.Task>()
                        on tracking.TaskId equals task.Id
                    join project in Unit.All<Entity.Project>()
                        on task.ProjectId equals project.Id
                    select new TrackingDto
                    {
                        TrackingId = tracking.Id,
                        ProjectName = project.Name,
                        TaskName = task.Name,
                        TaskDescription = task.Description,
                        TaskType = task.Type,
                        TrackingDate = tracking.AsOfDate,
                        StartTime = tracking.RangeFrom.ToTime(),
                        EndTime = tracking.RangeFrom.ToTime()
                    };
        }
        public async Task CreateTracking(string username, TrackingDto trackingDto)
        {
            var user = Unit.All<Entity.User>().FirstOrDefault(u => u.Name == username);
            var project = await Unit.Repo<Entity.Project, INamedRepository<Entity.Project>>().FindOrCreateAsync(trackingDto.ProjectName);
            var task = await Unit.Repo<Entity.Task, INamedRepository<Entity.Task>>().FindOrCreateAsync(trackingDto.TaskName, t =>
            {
                t.Project = project;
                t.Description = trackingDto.TaskDescription;
                t.Type = trackingDto.TaskType;
            });

            var tracking = new Entity.Tracking
            {
                Task = task,
                AsOfDate = trackingDto.TrackingDate,
                RangeFrom = trackingDto.StartTime.ToSpan(),
                RangeTo = trackingDto.EndTime.ToSpan(),
                User = user
            };
            var repo = Unit.Repo<Entity.Tracking>();
            repo.Create(tracking);
            await repo.Commit();
        }
        public async Task DeleteTracking(string username, int trackingId)
        {
            var tracking = Unit.All<Entity.Tracking>().Include(t => t.User).FirstOrDefault(t => t.Id == trackingId);
            CheckError(tracking != null, "Tracking does not exist");
            CheckError(tracking.User.Name == username, "Tracking belongs to another user"); ;

            var repo = Unit.Repo<Entity.Tracking>();
            repo.Delete(tracking);
            await repo.Commit();
        }

    }
}
