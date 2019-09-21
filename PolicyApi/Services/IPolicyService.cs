using CookBookApi.Model;
using ReceiptCookbookApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBookApi.Services
{
    public interface IPolicyService
    {
        IList<Policy> GetPolicies();
        IList<Policy> GetPoliciesByUserId(string userId);
        Policy GetPolicyById(int id);
        void SavePolicy(Policy policy,string tokenId);
        void UpdatePolicy(Policy policy, string tokenId);
        User GetCurrentUser(User user);
        bool ValidatePolicy(Policy policy);
        void DeletePolicies(string tokenId);
    }
}
