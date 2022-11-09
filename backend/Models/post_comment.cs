using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class POST_COMMENTS
    {
        public POST_COMMENTS(string user_id, string comment){
            this.user_id = user_id;
            this.comment = comment;
        }

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