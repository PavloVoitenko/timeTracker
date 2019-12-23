using GenericRepository.Abstractions.Entities;

using System;

namespace TimeTracker.Model.Entities
{
    public class UserRefresh : EntityBase
    {
        public string RefreshToken { get; set; }
        public DateTime ExpiresOn { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
