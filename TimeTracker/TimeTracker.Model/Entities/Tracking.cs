using GenericRepository.Abstractions.Entities;

namespace TimeTracker.Model.Entities
{
    public class Tracking : DateTimeStateEntityBase
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public virtual Task Task { get; set; }
        public virtual User User { get; set; }
    }
}
