using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CookBookApi.Model;
using CookBookApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using ReceiptCookbookApi.Models;

namespace CookBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PolicyController : ControllerBase
    {
        private IPolicyService policyService;
        private IUserService userService;

        public PolicyController(IPolicyService policyService, IUserService userService)
        {
            this.policyService = policyService;
            this.userService = userService;
        }
        // GET: api/Policy
        [HttpGet]
        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Client)]
        [Authorize(Roles = "Developer,Tester,Administrator")]
        public IActionResult Get()
        {
            var userId = HttpContext.User.Claims.Where(x =>x.Type == ClaimTypes.Name).SingleOrDefault()?.Value;
            return Ok(this.policyService.GetPoliciesByUserId(userId));
        }

        // GET: api/Policy/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var policy = this.policyService.GetPolicyById(id);

            if (policy == null)
            {
                return NotFound("No record found against this id...");
            }

            return Ok(policy);
        }


        // POST: api/Policy
        [HttpPut]
        [Route("[action]")]
        [Authorize(Roles ="Developer,Tester,Administrator")]
        public IActionResult StorePolicies([FromBody] IList<Policy> policies )
        {
            var tokenId = HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.Name).SingleOrDefault()?.Value;

            if (!policies.Any())
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            
            foreach(var policy in policies)
            {
                if (this.policyService.ValidatePolicy(policy))
                {
                    this.policyService.SavePolicy(policy, tokenId);
                }
                else
                {
                    this.policyService.UpdatePolicy(policy, tokenId);
                }

            }

            return StatusCode(StatusCodes.Status201Created);

        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult ValidateCurrentUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("No current user");
            }

            var localuser = this.policyService.GetCurrentUser(user);
            if(localuser == null)
            {
                return BadRequest("this user doesn't exist");
            }

            this.userService.CurrentUser = localuser;
            return Ok("The user is validated!");
        }

        // PUT: api/Policy/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpDelete]
        [Route("[action]")]
        [Authorize(Roles = "Developer,Tester,Administrator")]
        public IActionResult DeleteAll()
        {
            var tokenId = HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.Name).SingleOrDefault()?.Value;
            this.policyService.DeletePolicies(tokenId);
            return NoContent();
        }
    }
}
