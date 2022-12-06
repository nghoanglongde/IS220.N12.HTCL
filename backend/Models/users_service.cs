using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace backend.Models
{
    public class USERS_SERVICE
    {
        private readonly IMongoCollection<USERS> _users;
        private readonly MongoDBContext _connection;
        public USERS_SERVICE(MongoDBContext context)
        {
            _connection = context;
            _users = _connection.users;
        }

        public List<USERS> GetAll() =>
            _users.Find(user => true).ToList();

        public USERS Get(string id) =>
            _users.Find<USERS>(user => user.user_id == id).FirstOrDefault();

        public Boolean Create(USERS user)
        {
            try{
                _users.InsertOne(user);
            } catch(Exception err){
                Console.WriteLine("Error when insert new user");
                return false;
            }
            return true;
        }

        public Boolean Update(string user_id, USERS USERIn){
            try{
                _users.ReplaceOne(user => user.user_id == user_id, USERIn);
            } catch(Exception err){
                Console.WriteLine("Error when update user");
                return false;
            }
            return true;
        }

        public Boolean Remove(USERS USERIn){
            try{
                _users.DeleteOne(user => user.user_id == USERIn.user_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete user");
                return false;
            }
            return true;
        }
        public Boolean Remove(string user_id){
            try{
                _users.DeleteOne(user => user.user_id == user_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete user");
                return false;
            }
            return true;
        }
        
        public USERS VerifyLogin(string account_email, string account_pwd){
            var results = 
                from user in _users.AsQueryable()
                where user.account_email == account_email && user.account_pwd == account_pwd
                select user
            ;
            // var matched_user = results.ToArray();
            // Console.WriteLine(matched_user.Count());
            // Console.WriteLine(matched_user[1].fullname);
            return results.FirstOrDefault();
        }

        public Boolean UserExists(string account_email){
            var results = 
                from user in _users.AsQueryable()
                where user.account_email == account_email
                select user
            ;

            return results.FirstOrDefault() is null ? false : true;
        }

        public List<USERS> GetListFollower(string user_id){
            var res_user = 
                from user in _users.AsQueryable()
                where user.user_id == user_id
                select user
            ;
            List<USERS> li_users = new List<USERS>();
            foreach(string follower_id in res_user.FirstOrDefault().users_followed_id){
                li_users.Add(Get(follower_id));
            }
            return li_users;
        }

        public List<USERS> GetListFollowing(string user_id){
            var res_user = 
                from user in _users.AsQueryable()
                where user.user_id == user_id
                select user
            ;
            List<USERS> li_users = new List<USERS>();
            foreach(string following_id in res_user.FirstOrDefault().users_following_id){
                li_users.Add(Get(following_id));
            }
            return li_users;
        }

        public Boolean Follow(string user_id, string wanna_fl_user_id){
            try{
                var filter = Builders<USERS>.Filter.Eq(user => user.user_id, user_id);
                var update = Builders<USERS>.Update.Push(user => user.users_followed_id, wanna_fl_user_id);
                _users.UpdateOneAsync(filter, update);
            } catch(Exception err){
                Console.WriteLine("Error when update user");
                return false;
            }
            return true;
        }

        public USERS UpdateProfile(
            string user_id, 
            string fullname,
            string about,
            string phone_number,
            string address,
            string avatar,
            string account_pwd
        ){
         
            try{
                var filter = Builders<USERS>.Filter.Eq(user => user.user_id, user_id);
                var updateValues = Builders<USERS>.Update.Set(user => user.fullname, fullname)
                                                         .Set(user => user.about, about)
                                                         .Set(user => user.phone_number, phone_number)
                                                         .Set(user => user.address, address)
                                                         .Set(user => user.avatar, avatar)
                                                         .Set(user => user.account_pwd, account_pwd);
                _users.UpdateOneAsync(filter, updateValues);
            } catch(Exception err){
                Console.WriteLine("Error when update user");
                
                return null;
            }
            USERS new_profile = new USERS(fullname, about, phone_number, address, account_pwd, avatar);
          
            return new_profile;
        }
    }
}