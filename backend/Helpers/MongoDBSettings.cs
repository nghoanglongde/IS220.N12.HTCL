namespace backend.Helpers
{
    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string USERS_CollectionName { get; set; } = null!;
    }
}