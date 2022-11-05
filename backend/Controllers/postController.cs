using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Newtonsoft.Json;
using CloudinaryDotNet.Actions;
using System.Net.Http.Headers;

namespace IS220.N12.HTCL.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class postController : ControllerBase{
        private readonly POSTS_SERVICE _post_service;
        private readonly CATEGORIES_SERVICE _categories_service;
        private readonly CLOUDINARY_SERVICE _cloudinary_service;
        public postController(POSTS_SERVICE post_service, CATEGORIES_SERVICE category_service, CLOUDINARY_SERVICE cloudinary_service){
            _post_service = post_service;
            _categories_service = category_service;
            _cloudinary_service = cloudinary_service;
        }

        [Route("homepage"), HttpGet]
        public JsonResult HomePage(){
            List<POSTS> li_posts = _post_service.GetAll();
            return new JsonResult(new
            {
                statuscode = 200,
                message = li_posts
            });
        }

        [Route("create"), HttpGet]
        public JsonResult GetCreatePost(){
            List<CATEGORIES> li_categories = _categories_service.GetAll();
            return new JsonResult(new
            {
                statuscode = 200,
                message = li_categories
            });
        }

        [Route("create"), HttpPost]
        public async Task<JsonResult> CreatePost([FromForm] string data, [FromForm] IFormFile? img = null){
            // data demo
            // {
            //     "user_id": "634bc0f651cde90ded939af3",
            //     "categories_id": ["635a1ff01de407c512a3f6fc"],
            //     "title": "Nguoi yeu Hoang Long",
            //     "description": "Anh chup o Nam Dinh"
            // },
            // image
            
            dynamic? data_converted = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(data);
            var image_upload_res = await _cloudinary_service.UploadPhotoAsync(img);
            
            if(image_upload_res.Error != null){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when uploading image to cloudinary"
                });
            }

            string user_id = (string) data_converted.user_id;
            var categories_id =  data_converted.categories_id;
            List<Object> comments_id = new List<Object>();
            string post_type = "self_created";
            string image = (string) image_upload_res.Url.AbsoluteUri;
            string title = (string) data_converted.title;
            string description = (string) data_converted.description;
            
            POSTS new_post = new POSTS(user_id, categories_id, comments_id, post_type, image, title, description);
            
            try{
                _post_service.Create(new_post);
            } catch(Exception err){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when insert new post to database"
                });
            }
            
            return new JsonResult(new{
                statuscode = 200,
                message = "Create post success"
            });
        }
    }
}