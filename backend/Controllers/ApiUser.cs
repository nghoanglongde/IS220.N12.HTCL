using Microsoft.AspNetCore.Mvc;

namespace IS220.N12.HTCL.Controllers;


[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = new[]
        {
            new {Name = "Long"},
            new {Name = "HLong"}
        };
        return Ok(users);
    }
}
