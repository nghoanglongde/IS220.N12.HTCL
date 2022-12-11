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
        private readonly POST_COMMENTS_SERVICE _post_comment_service;
        private readonly CLOUDINARY_SERVICE _cloudinary_service;
        public postController(
                POSTS_SERVICE post_service, 
                CATEGORIES_SERVICE category_service,
                POST_COMMENTS_SERVICE post_comment_service, 
                CLOUDINARY_SERVICE cloudinary_service){
            _post_service = post_service;
            _categories_service = category_service;
            _cloudinary_service = cloudinary_service;
            _post_comment_service = post_comment_service;
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
            //     "user_id": "634bc2a051cde90ded939af6",
            //     "categories_id": ["635a1ff01de407c512a3f6fc"],
            //     "title": "Nguoi yeu Hoang Long",
            //     "description": "Anh chup o Nam Dinh"
            // }
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

        [Route("detail"), HttpPost]
        public JsonResult GetPostDetail(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            var post_id = (string) data.post_id;
            var post_detail = _post_service.GetPostDetail(post_id);

            if(post_detail is null){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Failed to get post detail"
                });
            }
            return new JsonResult(new{
                statuscode = 200,
                message = post_detail
            });
        }

        [Route("comment"), HttpPost]
        public JsonResult PostComment(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            var post_id = (string) data.post_id;
            var user_send_cmt_id = (string) data.user_send_cmt_id;
            var comment = (string) data.comment;

            POST_COMMENTS new_comment = new POST_COMMENTS(user_send_cmt_id, comment);
            _post_comment_service.Create(new_comment);

            Boolean add_commented = _post_service.AddComment(post_id, new_comment.comment_id);

            if(add_commented == false){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Failed to add commented"
                });
            }
            return new JsonResult(new{
                statuscode = 200,
                message = "Add commented success"
            });
        }

        [Route("save-post"), HttpPost]
        public JsonResult SavePost(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            var post_id = (string) data.post_id;
            var user_save_post_id = (string) data.user_save_post_id;
            
            POSTS post = _post_service.GetByPostID(post_id);

            POSTS new_post = new POSTS(
                user_save_post_id,
                post.categories_id, 
                post.comments_id, 
                "saved_from_other",
                post.image,
                post.title,
                post.description)
            ;

            try{
                _post_service.Create(new_post, post_id);
            } catch(Exception err){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when save post to database"
                });
            }
            
            return new JsonResult(new{
                statuscode = 200,
                message = "Save post success"
            });

        }

        [Route("post-search"), HttpPost]
        public JsonResult PostSearch(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            var search_content = (string) data.search_content;
            
            List<POSTS> li_posts = _post_service.Search(search_content);
            
            return new JsonResult(new{
                statuscode = 200,
                message = li_posts
            });

        }

        [Route("remove-post"), HttpPost]
        public JsonResult RemovePost(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            var post_id = (string) data.post_id;
            
            var post_removed = _post_service.Remove(post_id);
            
            if(post_removed == false){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Failed to remove post"
                });
            }
            return new JsonResult(new{
                statuscode = 200,
                message = "Remove post success"
            });

        }

    }
}