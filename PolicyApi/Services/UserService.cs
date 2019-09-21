using CookBookApi.Enums;
using CookBookApi.Helpers;
using CookBookApi.Model;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CookBookApi.Services
{
    public class UserService:IUserService
    {
        private CookBookDbContext cookbookDbContext;
        private readonly AppSettings appSettings;
        public User CurrentUser { get; set; }

        public UserService(IOptions<AppSettings> appSettings, CookBookDbContext context)
        {
            this.appSettings = appSettings.Value;
            this.cookbookDbContext = context;
        }

        public List<Account> GetAllAccounts()
        {
            var accounts = new List<Account>();
            var users = this.cookbookDbContext.Users;
            if (!users.Any())
            {
                return accounts;
            }

            var policies = this.cookbookDbContext.Policies;
            if (!policies.Any())
            {
                foreach(var user in users)
                {
                    var account = new Account();
                    account.Username = user.Email;
                    account.Role = user.Role.ToString();
                    accounts.Add(account);
                }

                return accounts;
            }

             foreach(var user in users)
            {
                var account = new Account();
                foreach (var policy in policies)
                {
                    account.Username = user.Email;
                    account.Role = user.Role.ToString();
                    if (policy.TokenId.Equals(user.UserTokenId))
                    {
                        account.Policies = policies.ToList();
                    }
                    accounts.Add(account);
                }
            }
            return accounts;
        }

        public User Authenticate(string email, string password)
        {
            var user = this.cookbookDbContext.Users.FirstOrDefault(x => x.Email == email && x.Password == password);

            if(user == null)
            {
                return null;
            }

            this.createJWTToken(user);
            user.Password = null;
            return user;
        }

        public User RegisterUser(User user)
        {
            var tokenId = Guid.NewGuid().ToString();
            var localUsers = this.cookbookDbContext.Users.Where(x => x.Email.Equals(user.Email));
            if (localUsers.Any())
            {
                return user;
            }

            //temporary
            this.setUpUser(user, tokenId);

            //create JWT token
            this.createJWTToken(user);

            //save data
            this.saveData(user);
            user.Password = null;
            return user;
        }

        private void setUpUser(User user, string tokenId)
        {
            user.UserTokenId = tokenId;
            user.Registered = true;
            user.ExpiresIn = 1800;
        }

        private void createJWTToken(User user)
        {
            string role;
            switch (user.Role)
            {
                case RoleEnum.Developer:
                    role = "Developer";
                    break;
                case RoleEnum.Tester:
                    role = "Tester";
                    break;
                case RoleEnum.Administrator:
                    role = "Administrator";
                    break;
                default:
                    role = null;
                    break;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserTokenId),
                    new Claim(ClaimTypes.Role, role ),
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
        }

        private void saveData(User user)
        {
            this.cookbookDbContext.Users.Add(user);
            this.cookbookDbContext.SaveChanges();
        }
    }
}
