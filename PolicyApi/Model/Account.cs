using ReceiptCookbookApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBookApi.Model
{
    public class Account
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public List<Policy> Policies { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
