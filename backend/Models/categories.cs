using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class CATEGORIES
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string category_id { get; set; } = null!;

        [BsonElement]
        public string category_description { get; set; } = null!;
    }
}