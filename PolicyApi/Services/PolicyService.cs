using CookBookApi.Model;
using ReceiptCookbookApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBookApi.Services
{
    public class PolicyService: IPolicyService
    {
        private CookBookDbContext cookBookDbContext;

        public PolicyService(CookBookDbContext cookBookDbContext)
        {
            this.cookBookDbContext = cookBookDbContext;
        }

        public IList<Policy> GetPoliciesByUserId(string userId)
        {
            return this.cookBookDbContext.Policies.Where(x=>x.TokenId == userId).ToList();
        }

        public IList<Policy> GetPolicies()
        {
            return this.cookBookDbContext.Policies.ToList();
        }
        public Policy GetPolicyById(int id)
        {
            return this.cookBookDbContext.Policies.Find(id);
        }

        public void SavePolicy(Policy policy,string tokenId)
        {
            policy.TokenId = tokenId;
            this.cookBookDbContext.Policies.Add(policy);
            this.cookBookDbContext.SaveChanges();
        }
        public void UpdatePolicy(Policy policy, string tokenId)
        {
            var localPolicy = this.cookBookDbContext.Policies.FirstOrDefault(x=>x.TokenId == tokenId);
            localPolicy.Name = policy.Name;
            localPolicy.Description = policy.Description;
            localPolicy.ImagePath = policy.ImagePath;
            localPolicy.TokenId = tokenId;
            localPolicy.SubPolicies = policy.SubPolicies;
            this.cookBookDbContext.SaveChanges();
        }

        public User GetCurrentUser(User user)
        {
            return this.cookBookDbContext.Users.FirstOrDefault(x => x.Email.Equals(user.Email));
        }

        public bool ValidatePolicy(Policy policy)
        {
            return policy.PolicyId == 0;
        }

        public void DeletePolicies(string tokenId)
        {
            var policies = this.cookBookDbContext.Policies.Where(x => x.TokenId == tokenId);
            this.cookBookDbContext.Policies.RemoveRange(policies);
            this.cookBookDbContext.SaveChanges();
        }
    }
}
