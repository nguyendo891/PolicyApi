using CookBookApi.Enums;
using Newtonsoft.Json;

namespace CookBookApi.Model
{
    public class User
    {
        public int UserId { get; set; }

        [JsonIgnore]
        public string UserTokenId { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public int ExpiresIn { get; set; }
        public string Password { get; set; }
        public bool? Registered { get; set; }

        [JsonIgnore]
        public RoleEnum Role { get; set; }
    }
}
