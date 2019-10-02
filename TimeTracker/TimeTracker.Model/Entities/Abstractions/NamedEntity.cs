using System.ComponentModel.DataAnnotations;

namespace TimeTracker.Model.Entities.Abstractions
{
    public abstract class NamedEntity : EntityBase
    {
        //[Key]
        public string Name { get; set; }
    }
}
