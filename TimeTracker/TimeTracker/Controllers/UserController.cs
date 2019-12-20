using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TimeTracker.DTOs;
using TimeTracker.Model;
using TimeTracker.Services.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TimeTracker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly TimeTrackingContext _context;
        private readonly IUserService _service;

        public UserController(TimeTrackingContext context, IUserService userService)
        {
            _context = context;
            _service = userService;
        }

        // POST api/<controller>
        [HttpPost]
        [AllowAnonymous]
        public async Task<TokenDto> Post([FromBody]UserDto userDto)
        {
            return new TokenDto
            {
                Token = await _service.CreateAsync(userDto)
            };
        }

        [HttpPost("[action]", Name = "auth")]
        [AllowAnonymous]
        public TokenDto Auth([FromBody]UserDto userDto)
        {
            return new TokenDto
            {
                Token = _service.Authenticate(userDto)
            };
        }
    }
}
