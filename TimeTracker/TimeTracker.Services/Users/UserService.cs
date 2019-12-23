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

using System.Security.Cryptography;
using System.Linq;

namespace TimeTracker.Services.Users
{
    public interface IUserService
    {
        Task<TokenDto> AuthenticateAsync(UserDto userDto);
        Task<TokenDto> RefreshAsync(string username, string refreshToken);

        Task<TokenDto> CreateAsync(UserDto userDto);
    }

    public class UserService : ServiceBase, IUserService
    {
        private readonly IConfiguration _config;
        public UserService(IUnitOfWork unit, IConfiguration config) : base(unit)
        {
            _config = config;
        }

        public async Task<TokenDto> CreateAsync(UserDto userDto)
        {
            var repo = Unit.Repo<User, INamedRepository<User>>();

            CheckError(repo.FindName(userDto.Username) == null, Messages.AlreadyExists(MessageEntity.User));

            await repo.CreateNameAsync(userDto.Username, u => (u.PasswordHash, u.PasswordSalt) = PasswordHasher.Hash(userDto.Password));

            return await AuthenticateAsync(userDto);
        }

        public async Task<TokenDto> AuthenticateAsync(UserDto userDto)
        {
            var user = Unit.Repo<User, INamedRepository<User>>().FindName(userDto.Username);
            CheckError(user != null, Messages.DoesNotExist(MessageEntity.User));

            var (passwordHash, _) = PasswordHasher.Hash(userDto.Password, user.PasswordSalt);
            CheckError(passwordHash == user.PasswordHash, Messages.UsernamePasswordIncorrect);

            return await GetTokenAsync(user);
        }

        public async Task<TokenDto> RefreshAsync(string username, string refreshToken)
        {
            await DeleteExpiredRefreshAsync();

            var user = Unit.Repo<User, INamedRepository<User>>().FindName(username);
            CheckError(user != null, Messages.DoesNotExist(MessageEntity.User));

            var repo = Unit.Repo<UserRefresh>();
            var refresh = repo.Get().FirstOrDefault(ur => ur.UserId == user.Id && ur.RefreshToken == refreshToken && ur.ExpiresOn >= DateTime.Now);
            CheckError(refresh != null, Messages.PleaseSignIn);

            repo.Delete(refresh);
            await repo.Commit();

            return await GetTokenAsync(user);
        }

        protected async Task<TokenDto> GetTokenAsync(User user)
        {
            return new TokenDto
            {
                AuthToken = CreateAuthToken(user.Name),
                RefreshToken = await CreateRefreshTokenAsync(user)
            };
        }

        protected async System.Threading.Tasks.Task DeleteExpiredRefreshAsync()
        {
            var repo = Unit.Repo<UserRefresh>();
            repo.Delete(repo.Get().Where(ur => ur.ExpiresOn <= DateTime.Now).ToArray());
            await repo.Commit();
        }

        protected string CreateAuthToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SigningKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, username) };
            var options = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddHours(8), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(options);
        }

        protected async Task<string> CreateRefreshTokenAsync(User user)
        {
            var bytes = new byte[32];
            using var random = RandomNumberGenerator.Create();
            random.GetBytes(bytes);
            var result = Convert.ToBase64String(bytes);

            var refresh = new UserRefresh
            {
                ExpiresOn = DateTime.Now.AddSeconds(double.Parse(_config["Jwt:ExpireIn"])),
                RefreshToken = result,
                User = user
            };
            var repo = Unit.Repo<UserRefresh>();
            repo.Create(refresh);
            await repo.Commit();            

            return result;
        }

    }
}
