using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Newtonsoft.Json;


namespace IS220.N12.HTCL.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class userController : ControllerBase {
        private readonly USERS_SERVICE _user_service;
        private readonly POSTS_SERVICE _post_service;
        public userController(USERS_SERVICE user_service, POSTS_SERVICE post_service){
            _user_service = user_service;
            _post_service = post_service;
        }

        public string? GetCookie(string key){
            return HttpContext.Request.Cookies[key];
        }

        public void SetCookie(string key, string value){
            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(7));
            HttpContext.Response.Cookies.Append(key, value, cookieOptions);
        }

        public void RemoveCookie(string key){
            HttpContext.Response.Cookies.Delete(key);
        }

        [Route("sign-up"), HttpPost]
        public JsonResult SignUp(){
            var reader = new StreamReader(HttpContext.Request.Body);
            var body = reader.ReadToEnd();
            dynamic? data = JsonConvert.DeserializeObject<System.Dynamic.ExpandoObject>(body);

            string fullname = (string) data.fullname;
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

            USERS new_user = new USERS(fullname, phone_number, address, account_email, account_pwd, avatar);
            
            try{
                _user_service.Create(new_user);
            } catch(Exception err){
                return new JsonResult(new{
                    statuscode = 400,
                    message = "Error when insert new user to database"
                });
            }
            
            SetCookie("user_id", new_user.user_id);
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

            // Set cookie and return message when true
            SetCookie("user_id", matched_user.user_id);

            return new JsonResult(new
            {
                statuscode = 200,
                message = new {
                    num_users_followed = matched_user.users_followed_id.Length,
                    num_users_following = matched_user.users_following_id.Length,
                    fullname = matched_user.fullname,
                    about = matched_user.about,
                    avatar = matched_user.avatar
                }
            });
        }


        [Route("log-out"), HttpGet]
        public JsonResult LogOut(){
            if (GetCookie("user_id") != null){
                RemoveCookie("user_id");
            }
            return new JsonResult(new
            {
                status = 200,
                message = "Log out success"
            });
        }
        
        [Route("get-post"), HttpGet]
        public JsonResult GetPost(){
            var user_id = GetCookie("user_id");
            if (user_id == null){
                return new JsonResult(new{
                    status = 400,
                    message = "User did not login"
                });
            }

            List<POSTS> li_posts = _post_service.GetByUserID(user_id);
            
            return new JsonResult(new{
                statuscode = 200,
                message = li_posts
            });
        }
    }
}