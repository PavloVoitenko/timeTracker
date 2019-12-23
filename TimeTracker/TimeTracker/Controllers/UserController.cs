using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TimeTracker.DTOs;
using TimeTracker.Services.Users;

namespace TimeTracker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserService _service;

        public UserController(IUserService userService)
        {
            _service = userService;
        }

        // POST api/<controller>
        [HttpPost]
        [AllowAnonymous]
        public async Task<TokenDto> Post([FromBody]UserDto userDto)
        {
            return await _service.CreateAsync(userDto);
        }

        [HttpPost("[action]", Name = "auth")]
        [AllowAnonymous]
        public async Task<TokenDto> Auth([FromBody]UserDto userDto)
        {
            return await _service.AuthenticateAsync(userDto);
        }

        [HttpPost("[action]", Name = "refresh")]
        [AllowAnonymous]
        public async Task<TokenDto> Refresh([FromBody]TokenDto tokenDto)
        {
            var username = User.FindFirstValue(ClaimTypes.Name);
            return await _service.RefreshAsync(username, tokenDto.RefreshToken);
        }
    }
}
