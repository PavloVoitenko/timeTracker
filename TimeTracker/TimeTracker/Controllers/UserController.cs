using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.DTOs;
using TimeTracker.Exceptions;
using TimeTracker.Model;
using TimeTracker.Model.Entities;
using TimeTracker.Services;
using TimeTracker.Services.Util;

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
            var user = _context.User.FirstOrDefault(u => u.Username == userDto.Username);

            if (user != null)
            {
                throw new FunctionalException("User already exists");
            }

            user = new User
            {
                Username = userDto.Username
            };

            (user.PasswordHash, user.PasswordSalt) = PasswordHasher.Hash(userDto.Password);

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return new TokenDto
            {
                Token = _service.Authenticate(userDto)
            };
        }

        [HttpPost("[action]", Name = "auth")]
        [AllowAnonymous]
        public TokenDto Auth([FromBody]UserDto userDto)
        {
            var token = _service.Authenticate(userDto);

            if (string.IsNullOrEmpty(token))
            {
                throw new FunctionalException("Could not authenticate. Check parameters");
            }

            return new TokenDto
            {
                Token = token
            };
        }
    }
}
