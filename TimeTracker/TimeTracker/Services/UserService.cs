using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TimeTracker.DTOs;
using TimeTracker.Model;
using TimeTracker.Services.Util;

namespace TimeTracker.Services
{
    public interface IUserService
    {
        string Authenticate(UserDto userDto);
    }

    public class UserService : IUserService
    {
        private readonly TimeTrackingContext _context;
        private readonly IConfiguration _config;

        public UserService(TimeTrackingContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public string Authenticate(UserDto userDto)
        {
            var token = string.Empty;
            var user = _context.User.FirstOrDefault(u => u.Username == userDto.Username);

            if (user == null)
            {
                throw new Exception("User does not exist");
            }

            var (PasswordHash, Salt) = PasswordHasher.Hash(userDto.Password, user.PasswordSalt);

            if (PasswordHash == user.PasswordHash)
            {
                token = CreateAuthToken(user.Username);
            }

            return token;
        }

        protected string CreateAuthToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SigningKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, username) };
            var options = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddHours(8), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(options);
        }
    }
}
