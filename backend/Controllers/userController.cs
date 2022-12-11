using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Newtonsoft.Json;


namespace IS220.N12.HTCL.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class userController : ControllerBase {
        private readonly USERS_SERVICE _user_service;
        private readonly POSTS_SERVICE _post_service;
        private readonly CLOUDINARY_SERVICE _cloudinary_service;

        public userController(USERS_SERVICE user_service, POSTS_SERVICE post_service, CLOUDINARY_SERVICE cloudinary_service){
            _user_service = user_service;
            _post_service = post_service;
            _cloudinary_service = cloudinary_service;
        }

        [Route("sign-up"), HttpPost]
        public JsonResult SignUp(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            string fullname = (string) data.fullname;
            String[] users_followed_id = new String[] {};
            String[] users_following_id = new String[] {};
            string about = "";
            string phone_number = (string) data.phone_number;
            string address = (string) data.address;
            string account_email = (string) data.account_email;
            string account_pwd = (string) data.account_pwd;
            string avatar = (string) "http://res.cloudinary.com/dfpptiy4c/image/upload/v1666857283/WebProject/5130693_woy0fg.png";

            Boolean user_existed = _user_service.UserExists(account_email);
            if(user_existed){
                return new JsonResult(new
                {
                    statuscode = 400,
                    message = "Account already existed"
                });
            }

            USERS new_user = new USERS(
                            fullname, 
                            users_followed_id,
                            users_following_id,
                            about, 
                            phone_number, 
                            address, 
                            account_email, 
                            account_pwd, 
                            avatar);
            try{
                _user_service.Create(new_user);
            } catch(Exception err){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when insert new user to database"
                });
            }
            
            return new JsonResult(new
            {
                statuscode = 200,
                message = "Create account success"
            });
        }

        [Route("log-in"), HttpPost]
        public JsonResult SignIn(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            if(data is null){
                return new JsonResult(new {
                    statuscode = 400,
                    message = "Wrong email or password"
                });
            }

            string account_email = (string) data.account_email;
            string account_pwd = (string) data.account_pwd;
            var matched_user = _user_service.VerifyLogin(account_email, account_pwd);

            if(matched_user is null){
                return new JsonResult(new
                {
                    statuscode = 400,
                    message = "Wrong email or password"
                });
            }

            return new JsonResult(new
            {
                statuscode = 200,
                message = new {
                    user_id = matched_user.user_id,
                    num_users_followed = matched_user.users_followed_id.Length,
                    num_users_following = matched_user.users_following_id.Length,
                    fullname = matched_user.fullname,
                    about = matched_user.about,
                    phone_number = matched_user.phone_number,
                    address = matched_user.address,
                    avatar = matched_user.avatar,
                    account_email = matched_user.account_email,
                    account_pwd = matched_user.account_pwd
                }
            });
        }
        
        [Route("view-profile"), HttpPost]
        public JsonResult GetProfile(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);
            
            if(data is null){
                return new JsonResult(new {
                    statuscode = 400,
                    message = "Please send user id for get profile"
                });
            }

            var user_id = (string) data.user_id; 
            USERS info = _user_service.Get(user_id);
            List<POSTS> li_posts = _post_service.GetByUserID(user_id);
            
            return new JsonResult(new{
                statuscode = 200,
                message = new {
                    num_users_followed = info.users_followed_id.Length,
                    num_users_following = info.users_following_id.Length,
                    li_posts
                }
            });
        }

        [Route("get-follower"), HttpPost]
        public JsonResult GetListFollower(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);
            
            if(data is null){
                return new JsonResult(new {
                    statuscode = 400,
                    message = "Please send user id for get list follower"
                });
            }


            var user_id = (string) data.user_id; 
            
            List<USERS> li_follower = _user_service.GetListFollower(user_id); 

            return new JsonResult(new{
                statuscode = 200,
                message = li_follower
            });
        }

        [Route("get-following"), HttpPost]
        public JsonResult GetListFollowing(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);
            
            if(data is null){
                return new JsonResult(new {
                    statuscode = 400,
                    message = "Please send user id for get list following"
                });
            }

            var user_id = (string) data.user_id; 
            
            List<USERS> li_following = _user_service.GetListFollowing(user_id); 

            return new JsonResult(new{
                statuscode = 200,
                message = li_following
            });
        }


        [Route("follow"), HttpPost]
        public JsonResult Follow(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);
            
            if(data is null){
                return new JsonResult(new {
                    statuscode = 400,
                    message = "Please send user id for add to list follower"
                });
            }

            var user_id = (string) data.user_id;
            var wanna_fl_user_id = (string) data.wanna_fl_user_id; 
            var followed = _user_service.Follow(user_id, wanna_fl_user_id); 

            if(followed == false){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Follow failed by system"
                });
            }
            return new JsonResult(new{
                statuscode = 200,
                message = "Follow succeed"
            });
        }

        [Route("edit-profile"), HttpPost]
        public async Task<JsonResult> UpdateProfile([FromForm] string data, [FromForm] IFormFile? img = null){
            
            dynamic? data_converted = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(data);
            string avatar = (string) data_converted.avatar;
            if(img != null){
                var image_upload_res = await _cloudinary_service.UploadPhotoAsync(img);
                if(image_upload_res.Error != null){
                    return new JsonResult(new{
                        statuscode = 400,
                        message = "Error when uploading image to cloudinary"
                    });
                }
                avatar = (string) image_upload_res.Url.AbsoluteUri;
            }

            // not allow to update account email
            string user_id = (string) data_converted.user_id;
            string fullname =  (string) data_converted.fullname;
            string about = (string) data_converted.about;
            string phone_number = (string) data_converted.phone_number;
            string address = (string) data_converted.address;
            string account_pwd = (string) data_converted.account_pwd;
            
            var update_user_status = _user_service.UpdateProfile(user_id, fullname, about, phone_number, address, avatar, account_pwd);
            
            if(update_user_status is null){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when update user"
                });
            }
            
            return new JsonResult(new{
                statuscode = 200,
                message = new {
                    fullname = update_user_status.fullname,
                    about = update_user_status.about,
                    phone_number = update_user_status.phone_number,
                    address = update_user_status.address,
                    account_pwd = update_user_status.account_pwd,
                    avatar = update_user_status.avatar
                }
            });
        }
    }
}