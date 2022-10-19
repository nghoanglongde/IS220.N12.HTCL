using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Newtonsoft.Json;


namespace IS220.N12.HTCL.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class userController : ControllerBase {
        private readonly USERS_SERVICE _user_service;
        
        public userController(USERS_SERVICE user_service){
            _user_service = user_service;
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

            Boolean user_existed = _user_service.UserExists(account_email);
            if(user_existed){
                return new JsonResult(new
                {
                    statuscode = 400,
                    message = "Account already existed"
                });
            }

            USERS new_user = new USERS(fullname, phone_number, address, account_email, account_pwd);
            _user_service.Create(new_user);

            SetCookie("user_id", new_user.user_id);
            return new JsonResult(new
            {
                statuscode = 200,
                message = "Create account success"
            });
        }

        [Route("sign-in"), HttpPost]
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
                message = "success"
            });
        }


        [Route("sign-out"), HttpGet]
        public JsonResult SignOut(){
            if (GetCookie("user_id") != null){
                RemoveCookie("user_id");
            }
            return new JsonResult(new
            {
                status = 200,
                message = "Sign out success"
            });
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
    }
}