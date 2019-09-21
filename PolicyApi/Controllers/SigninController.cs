using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CookBookApi.Model;
using CookBookApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookBookApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SigninController : ControllerBase
    {
        private readonly IUserService userService;
       

        public SigninController(IUserService userService)
        {
            this.userService = userService;
            
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] User user)
        {
            var localUser = this.userService.Authenticate(user.Email, user.Password);

            if(localUser ==  null)
            {
                return BadRequest(new { message = "UserName or password is incorrect" });
            }

            return Ok(localUser);
        }
    }
}