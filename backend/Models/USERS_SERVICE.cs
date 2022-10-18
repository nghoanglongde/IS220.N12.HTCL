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

        public USERS Create(USERS user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, USERS USERSIn) =>
            _users.ReplaceOne(user => user.user_id == id, USERSIn);

        public void Remove(USERS USERSIn) =>
            _users.DeleteOne(user => user.user_id == USERSIn.user_id);

        public void Remove(string id) => 
            _users.DeleteOne(user => user.user_id == id);
        
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
    }
}