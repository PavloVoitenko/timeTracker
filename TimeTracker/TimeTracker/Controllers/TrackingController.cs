using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TimeTracker.DTOs;
using TimeTracker.Services.Trackings;

namespace TimeTracker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class TrackingController : Controller
    {
        private readonly ITrackingService _service;
        public TrackingController(ITrackingService service)
        {
            _service = service;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<TrackingDto> Get([FromQuery]DateTime periodStart, [FromQuery]DateTime periodEnd)
        {
            if (periodStart == DateTime.MinValue || periodEnd == DateTime.MinValue)
            {
                return new List<TrackingDto>();
            }

            var username = User.FindFirstValue(ClaimTypes.Name);

            return _service.GetTrackings(username, periodStart, periodEnd);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]TrackingDto trackingDto)
        {
            await _service.CreateTracking(User.FindFirst(ClaimTypes.Name).Value, trackingDto);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.DeleteTracking(User.FindFirst(ClaimTypes.Name).Value, id);
        }
    }
}
