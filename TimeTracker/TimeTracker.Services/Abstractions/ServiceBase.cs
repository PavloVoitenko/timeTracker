using GenericRepository.Unit;
using TimeTracker.Exceptions;

namespace TimeTracker.Services.Abstractions
{
    public abstract class ServiceBase
    {
        protected IUnitOfWork Unit { get; }
        public ServiceBase(IUnitOfWork unit)
        {
            Unit = unit;
        }

        protected void CheckError(bool condition, string message)
        {
            if (!condition)
            {
                throw new FunctionalException(message);
            }
        }
    }
}
