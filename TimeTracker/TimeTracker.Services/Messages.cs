namespace TimeTracker.Services
{
    static class MessageEntity
    {
        public const string Tracking = "Tracking";
        public const string User = "User";
    }

    static class Messages
    {
        public const string UsernamePasswordIncorrect = "Username or password is incorrect";
        public const string PleaseSignIn = "Please sign in";

        private const string DoesntExistFormat = "{0} does not exist";
        private const string BelongsToAnotherFormat = "{0} belongs to another {1}";
        private const string AlreadyExistsFormat = "{0} already exists";

        public static string DoesNotExist(string entity) => string.Format(DoesntExistFormat, entity);
        public static string AlreadyExists(string entity) => string.Format(AlreadyExistsFormat, entity);
        public static string BelongsToAnother(string first, string second) => string.Format(BelongsToAnotherFormat, first, second);
    }
}
