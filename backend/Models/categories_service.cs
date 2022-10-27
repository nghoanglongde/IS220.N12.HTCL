using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace backend.Models
{
    public class CATEGORIES_SERVICE
    {
        private readonly IMongoCollection<CATEGORIES> _categories;
        private readonly MongoDBContext _connection;
        public CATEGORIES_SERVICE(MongoDBContext context)
        {
            _connection = context;
            _categories = _connection.categories;
        }

        public List<CATEGORIES> GetAll(){
            List<CATEGORIES> li_categories = _categories.Find(cat => true).ToList();
            return li_categories;
        }

        public CATEGORIES GetByCategoryID(string category_id) =>
            _categories.Find<CATEGORIES>(category => category.category_id == category_id).FirstOrDefault();

        public Boolean Create(CATEGORIES category)
        {
            try{
                _categories.InsertOne(category);
            } catch(Exception err){
                Console.WriteLine("Error when insert new category");
                return false;
            }
            return true;
        }

        public Boolean Update(string category_id, CATEGORIES CATEGORYIn){
            try{
                _categories.ReplaceOne(category => category.category_id == category_id, CATEGORYIn);
            } catch(Exception err){
                Console.WriteLine("Error when update category");
                return false;
            }
            return true;
        }

        public Boolean Remove(CATEGORIES CATEGORYIn){
            try{
                _categories.DeleteOne(category => category.category_id == CATEGORYIn.category_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete category");
                return false;
            }
            return true;
        }
        public Boolean Remove(string category_id){
            try{
                _categories.DeleteOne(category => category.category_id == category_id);
            } catch(Exception err){
                Console.WriteLine("Error when delete category");
                return false;
            }
            return true;
        }
    }
}