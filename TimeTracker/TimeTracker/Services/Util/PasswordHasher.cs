using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace TimeTracker.Services.Util
{
    static class PasswordHasher
    {
        public static (string PasswordHash, string Salt) Hash(string value, string salt = "")
        {
            var saltArray = new byte[16];

            if (salt == string.Empty)
            {
                using (var random = RandomNumberGenerator.Create())
                {
                    random.GetBytes(saltArray);
                }

                salt = Encoding.UTF8.GetString(saltArray);
            }

            saltArray = Encoding.UTF8.GetBytes(salt).Take(16).ToArray();

            var hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(value, saltArray, KeyDerivationPrf.HMACSHA256, 1000, 32));

            return (hash, salt);
        }
    }
}