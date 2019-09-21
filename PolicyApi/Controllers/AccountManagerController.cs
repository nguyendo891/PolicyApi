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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountManagerController : ControllerBase
    {
        private IUserService userService;
        public AccountManagerController(IUserService userService)
        {
            this.userService = userService;
        }
        // GET: api/AccountManager
        [HttpGet]
        [Route("[action]")]
        [Authorize(Roles = "Administrator")]
        public ActionResult GetAllAccounts()
        {
            var accounts = new List<Account>();
            accounts = this.userService.GetAllAccounts();
            return Ok(accounts);
        }

        // GET: api/AccountManager/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/AccountManager
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/AccountManager/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
