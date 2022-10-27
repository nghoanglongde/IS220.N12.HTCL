using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace backend.Models
{
    public class POST_COMMENTS_SERVICE
    {
        private readonly IMongoCollection<POST_COMMENTS> _post_comments;
        private readonly MongoDBContext _connection;
        public POST_COMMENTS_SERVICE(MongoDBContext context)
        {
            _connection = context;
            _post_comments = _connection.post_comments;
        }

        public POST_COMMENTS GetByCommentID(string comment_id) =>
            _post_comments.Find<POST_COMMENTS>(post_comment => post_comment.comment_id == comment_id).FirstOrDefault();

        public Boolean Create(POST_COMMENTS post_comment)
        {
            try{
                _post_comments.InsertOne(post_comment);
            } catch(Exception err){
                Console.WriteLine("Error when insert new post_comment");
                return false;
            }
            return true;
        }

        public Boolean Update(string comment_id, POST_COMMENTS COMMENTIn){
            try{
                _post_comments.ReplaceOne(post_comment => post_comment.comment_id == comment_id, COMMENTIn);
            } catch(Exception err){
                Console.WriteLine("Error when update post_comment");
                return false;
            }
            return true;
        }

        public Boolean Remove(POST_COMMENTS COMMENTIn){
            try{
                _post_comments.DeleteOne(post_comment => post_comment.comment_id == COMMENTIn.comment_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete post_comment");
                return false;
            }
            return true;
        }
        public Boolean Remove(string comment_id){
            try{
                _post_comments.DeleteOne(post_comment => post_comment.comment_id == comment_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete post_comment");
                return false;
            }
            return true;
        }
    }
}