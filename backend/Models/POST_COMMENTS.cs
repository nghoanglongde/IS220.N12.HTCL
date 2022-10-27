using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class POST_COMMENTS
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string comment_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string user_id { get; set; } = null!;

        [BsonElement]
        public string comment { get; set; } = null!;
    }
}