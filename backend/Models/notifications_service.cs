using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace backend.Models
{
    public class NOTIFICATIONS_SERVICE
    {
        private readonly IMongoCollection<NOTIFICATIONS> _notifications;
        private readonly MongoDBContext _connection;
        public NOTIFICATIONS_SERVICE(MongoDBContext context)
        {
            _connection = context;
            _notifications = _connection.notifications;
        }

        public NOTIFICATIONS GetByNotiID(string noti_id) =>
            _notifications.Find<NOTIFICATIONS>(notification => notification.noti_id == noti_id).FirstOrDefault();

        public Boolean Create(NOTIFICATIONS notification)
        {
            try{
                _notifications.InsertOne(notification);
            } catch(Exception err){
                Console.WriteLine("Error when insert new notification");
                return false;
            }
            return true;
        }

        public Boolean Update(string noti_id, NOTIFICATIONS NOTIFICATIONIn){
            try{
                _notifications.ReplaceOne(notification => notification.noti_id == noti_id, NOTIFICATIONIn);
            } catch(Exception err){
                Console.WriteLine("Error when update notification");
                return false;
            }
            return true;
        }

        public Boolean Remove(NOTIFICATIONS NOTIFICATIONIn){
            try{
                _notifications.DeleteOne(notification => notification.noti_id == NOTIFICATIONIn.noti_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete notification");
                return false;
            }
            return true;
        }
        public Boolean Remove(string noti_id){
            try{
                _notifications.DeleteOne(notification => notification.noti_id == noti_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete notification");
                return false;
            }
            return true;
        }
    }
}