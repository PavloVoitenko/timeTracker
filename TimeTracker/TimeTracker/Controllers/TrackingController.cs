using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeTracker.DTOs;
using TimeTracker.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TimeTracker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class TrackingController : Controller
    {
        private readonly TimeTrackingContext _context;
        public TrackingController(TimeTrackingContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<TrackingDto> Get([FromQuery]DateTime? periodStart, [FromQuery]DateTime? periodEnd)
        {
            periodStart = periodStart ?? DateTime.MinValue;
            periodEnd = periodEnd ?? DateTime.MaxValue;

            var username = User.FindFirstValue(ClaimTypes.Name);
            var trackings = from tracking in _context.Tracking
                                where tracking.TrackingDate <= periodEnd && tracking.TrackingDate >= periodStart
                            join user in _context.User
                                on tracking.UserId equals user.Id
                                where user.Username == username
                            join task in _context.Task
                                on tracking.TaskId equals task.Id
                            join project in _context.Project
                                on task.ProjectId equals project.Id
                            select new TrackingDto
                            {
                                TrackingId = tracking.Id,
                                ProjectName = project.Name,
                                TaskName = task.Name,
                                TaskDescription = task.Description,
                                TaskType = task.Type,
                                TrackingDate = tracking.TrackingDate,
                                StartTime = tracking.StartTime,
                                EndTime = tracking.EndTime
                            };

            return trackings;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]TrackingDto trackingDto)
        {
            var user = _context.User.FirstOrDefault(u => u.Username == User.FindFirst(ClaimTypes.Name).Value);

            var project = _context.Project.FirstOrDefault(p => p.Name == trackingDto.ProjectName);
            if (project == null)
            {
                project = new Model.Entities.Project
                {
                    Name = trackingDto.ProjectName
                };
                _context.Add(project);
            }

            var task = _context.Task.FirstOrDefault(t => t.Name == trackingDto.TaskName);
            if (task == null)
            {
                task = new Model.Entities.Task
                {
                    Name = trackingDto.TaskName,
                    Project = project,
                    Description = trackingDto.TaskDescription,
                    Type = trackingDto.TaskType
                };
                _context.Add(task);
            }

            var tracking = new Model.Entities.Tracking
            {
                Task = task,
                TrackingDate = trackingDto.TrackingDate,
                StartTime = trackingDto.StartTime,
                EndTime = trackingDto.EndTime,
                User = user
            };
            _context.Add(tracking);
            await _context.SaveChangesAsync();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var tracking = _context.Tracking.Include(t => t.User).FirstOrDefault(t => t.Id == id);
            if (tracking == null)
            {
                throw new Exception("Tracking does not exist");
            }

            if (tracking.User.Username != User.FindFirst(ClaimTypes.Name).Value)
            {
                throw new Exception("Tracking belongs to another user");
            }

            _context.Remove(tracking);
            await _context.SaveChangesAsync();
        }
    }
}
