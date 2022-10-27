using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class NOTIFICATIONS
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string noti_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string from_user_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string to_user_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string post_id { get; set; } = null!;

        [BsonElement]
        public string action_description { get; set; } = null!;
    }
}