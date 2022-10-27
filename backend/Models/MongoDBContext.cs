using MongoDB.Driver;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Linq;
using backend.Helpers;

namespace backend.Models
{
    public class MongoDBContext
    {
        private readonly IMongoDatabase _database;

        public MongoDBContext(IOptions<MongoDBSettings> MongoDBSettings)
        {
            MongoClientSettings settings = MongoClientSettings.FromConnectionString(
                MongoDBSettings.Value.ConnectionString
            );
            settings.LinqProvider = LinqProvider.V3;
            var client = new MongoClient(settings);
            _database = client.GetDatabase(MongoDBSettings.Value.DatabaseName);
        }

        public IMongoCollection<USERS> users => _database.GetCollection<USERS>("USERS");
        public IMongoCollection<POSTS> posts => _database.GetCollection<POSTS>("POSTS");
        public IMongoCollection<POST_COMMENTS> post_comments => _database.GetCollection<POST_COMMENTS>("POST_COMMENTS");
        public IMongoCollection<NOTIFICATIONS> notifications => _database.GetCollection<NOTIFICATIONS>("NOTIFICATIONS");
        public IMongoCollection<CATEGORIES> categories => _database.GetCollection<CATEGORIES>("CATEGORIES");

    }
}