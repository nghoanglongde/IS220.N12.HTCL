using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class POSTS
    {
        public POSTS(
                    string user_id, 
                    dynamic categories_id, 
                    dynamic comments_id, 
                    string post_type,
                    string image,
                    string title,
                    string description){
            this.user_id = user_id;
            this.categories_id = categories_id;
            this.comments_id = comments_id;
            this.post_type = post_type;
            this.image = image;
            this.title = title;
            this.description = description;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string post_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string post_ref_id { get; set; } = null!;

        [BsonElement]
        [BsonRepresentation(BsonType.ObjectId)]
        public string user_id { get; set; } = null!;

        [BsonElement]
        public List<Object>? categories_id{ get; set; }

        [BsonElement]
        public List<Object>? comments_id{ get; set; }


        [BsonElement]
        public string post_type { get; set; } = null!;

        [BsonElement]
        public string image { get; set; } = null!;

        [BsonElement]
        public string? title { get; set; }

        [BsonElement]
        public string? description { get; set; }
    }
}