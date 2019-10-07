using System;

namespace TimeTracker.Exceptions
{

    [Serializable]
    public class FunctionalException : Exception
    {
        public FunctionalException() { }
        public FunctionalException(string message) : base(message) { }
        public FunctionalException(string message, Exception inner) : base(message, inner) { }
        protected FunctionalException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
