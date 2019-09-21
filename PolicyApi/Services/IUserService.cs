using CookBookApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBookApi.Services
{
    public interface IUserService
    {
        User CurrentUser { get; set; }
        User Authenticate( string usernName, string password);
        User RegisterUser(User user);
        List<Account> GetAllAccounts();
    }
}
