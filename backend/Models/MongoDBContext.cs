using MongoDB.Driver;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Linq;

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

    }
}