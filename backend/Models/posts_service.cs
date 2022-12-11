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
        private readonly USERS_SERVICE _user_service;
        private readonly POST_COMMENTS_SERVICE _post_comment_service;
        public POSTS_SERVICE(MongoDBContext context, USERS_SERVICE user_service, POST_COMMENTS_SERVICE post_comment_service)
        {
            _connection = context;
            _posts = _connection.posts;
            _user_service = user_service;
            _post_comment_service = post_comment_service;
        }

        public List<POSTS> GetAll(){
            List<POSTS> li_posts = _posts.Find(user => true).ToList();
            Random rand = new Random();
            List<POSTS> li_posts_shuffled = li_posts.OrderBy(val => rand.Next()).ToList();
            return li_posts_shuffled;
        }

        public List<POSTS> Search(string search_content){
            List<POSTS> li_posts = _posts.Find(post => post.title.ToLower().Contains(search_content.ToLower())).ToList();
            Random rand = new Random();
            List<POSTS> li_posts_shuffled = li_posts.OrderBy(val => rand.Next()).ToList();
            return li_posts_shuffled;
        }


        public POSTS GetByPostID(string post_id) =>
            _posts.Find<POSTS>(post => post.post_id == post_id).FirstOrDefault();

        public List<POSTS> GetByUserID(string user_id){
            List<POSTS> li_posts = _posts.Find(post => post.user_id == user_id).ToList();
            return li_posts;
        }
        
        public Boolean Create(POSTS post, string post_ref_id = null)
        {
            try{
                _posts.InsertOneAsync(post);
                if(post_ref_id is null){
                    Console.WriteLine("is null");
                    UpdatePostRefID(post.post_id, post.post_id);
                }else{
                    UpdatePostRefID(post.post_id, post_ref_id);
                }
            } catch(Exception err){
                Console.WriteLine("Error when insert new post");
                return false;
            }
            return true;
        }

        public void UpdatePostRefID(
            string post_id,
            string post_ref_id
        ){
            try{
                var filter = Builders<POSTS>.Filter.Eq(post => post.post_id, post_id);
                var updateValues = Builders<POSTS>.Update.Set(post => post.post_ref_id, post_ref_id);
                _posts.UpdateOneAsync(filter, updateValues);
            } catch(Exception err){
                Console.WriteLine("Error when update post ref id");
            }
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
                _posts.DeleteOne(post => post.post_id == post_id || post.post_ref_id == post_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete post");
                return false;
            }
            return true;
        }

        public POST_DETAIL GetPostDetail(string post_id){
            var post_query = 
                from post in _posts.AsQueryable()
                where post.post_id == post_id
                select post
            ;

            POSTS res_post = post_query.FirstOrDefault();
            USERS user = _user_service.Get(res_post.user_id);

            var comments_detail = new List<Object>();
            foreach(string cmt_id in res_post.comments_id){
                POST_COMMENTS cmt = _post_comment_service.GetByCommentID(cmt_id);
                USERS user_cmt = _user_service.Get(cmt.user_id);
                comments_detail.Add(new {
                    user_id = cmt.user_id,
                    user_name = user_cmt.fullname,
                    user_avatar = user_cmt.avatar,
                    comment = cmt.comment
                });
            }

            POST_DETAIL post_detail = new POST_DETAIL(
                res_post.post_id,
                res_post.user_id,
                user.fullname,
                user.avatar,
                res_post.title,
                res_post.description,
                res_post.image,
                comments_detail
            );

            return post_detail;
        }

        public Boolean AddComment(string post_id, string comment_id){
            try{
                var filter = Builders<POSTS>.Filter.Eq(post => post.post_id, post_id);
                var update = Builders<POSTS>.Update.Push(post => post.comments_id, comment_id);
                _posts.UpdateOneAsync(filter, update);
            } catch(Exception err){
                Console.WriteLine("Error when update post comments_id");
                return false;
            }
            return true;
        }
    }
}