using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Collections.Generic;

namespace backend.Models
{
    public class POSTS_SERVICE
    {
        private readonly IMongoCollection<POSTS> _posts;
        private readonly MongoDBContext _connection;
        public POSTS_SERVICE(MongoDBContext context)
        {
            _connection = context;
            _posts = _connection.posts;
        }

        public List<POSTS> GetAll(){
            List<POSTS> li_posts = _posts.Find(user => true).ToList();
            Random rand = new Random();
            List<POSTS> li_posts_shuffled = li_posts.OrderBy(val => rand.Next()).ToList();
            return li_posts_shuffled;
        }

        public POSTS GetByPostID(string post_id) =>
            _posts.Find<POSTS>(post => post.post_id == post_id).FirstOrDefault();

        public Boolean Create(POSTS post)
        {
            try{
                _posts.InsertOne(post);
            } catch(Exception err){
                Console.WriteLine("Error when insert new post");
                return false;
            }
            return true;
        }

        public Boolean Update(string post_id, POSTS POSTIn){
            try{
                _posts.ReplaceOne(post => post.post_id == post_id, POSTIn);
            } catch(Exception err){
                Console.WriteLine("Error when update post");
                return false;
            }
            return true;
        }

        public Boolean Remove(POSTS POSTIn){
            try{
                _posts.DeleteOne(post => post.post_id == POSTIn.post_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete post");
                return false;
            }
            return true;
        }
        public Boolean Remove(string post_id){
            try{
                _posts.DeleteOne(post => post.post_id == post_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete post");
                return false;
            }
            return true;
        }
    }
}