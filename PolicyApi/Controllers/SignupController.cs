using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CookBookApi.Enums;
using CookBookApi.Model;
using CookBookApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace CookBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {

        private IUserService userService;
        public SignupController(IUserService userService)
        {
            this.userService = userService;
        }

        // POST: api/Signup
        [HttpPost]
        public IActionResult Post([FromBody] JObject mappingObject)
        {
            User user = new User();
            user.Email =(string) mappingObject["email"];
            user.Password = (string)mappingObject["password"];
            user.Role = Newtonsoft.Json.JsonConvert.DeserializeObject<RoleEnum>(mappingObject["role"].ToString());
            user = this.userService.RegisterUser(user);
            if (user.Token == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "This email has been used !Please use other emails.");
            }
            else
            {
                return Ok(user);
            }
        }
    }
}
