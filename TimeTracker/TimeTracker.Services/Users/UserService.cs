using TimeTracker.DTOs;
using TimeTracker.Services.Abstractions;
using TimeTracker.Services.Util;
using TimeTracker.Model.Entities;
using GenericRepository.Unit;
using GenericRepository.Abstractions.Repositories;

using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace TimeTracker.Services.Users
{
    public interface IUserService
    {
        string Authenticate(UserDto userDto);
        Task<string> CreateAsync(UserDto userDto);
    }

    public class UserService : ServiceBase, IUserService
    {
        private readonly IConfiguration _config;
        public UserService(IUnitOfWork unit, IConfiguration config) : base(unit)
        {
            _config = config;
        }

        public async Task<string> CreateAsync(UserDto userDto)
        {
            var repo = Unit.Repo<User, INamedRepository<User>>();

            CheckError(repo.FindName(userDto.Username) == null, "User already exists");

            await repo.CreateNameAsync(userDto.Username, u => (u.PasswordHash, u.PasswordSalt) = PasswordHasher.Hash(userDto.Password));

            return Authenticate(userDto);
        }

        public string Authenticate(UserDto userDto)
        {
            var token = string.Empty;
            var user = Unit.Repo<User, INamedRepository<User>>().FindName(userDto.Username);

            CheckError(user != null, "User does not exist");

            var (passwordHash, _) = PasswordHasher.Hash(userDto.Password, user.PasswordSalt);

            if (passwordHash == user.PasswordHash)
            {
                token = CreateAuthToken(user.Name);
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
