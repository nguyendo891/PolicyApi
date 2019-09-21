using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReceiptCookbookApi.Models
{
    public class SubPolicy
    {
        public int SubPolicyId { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public int Amount { get; set; }

        public virtual Policy Policy { get; set; }
    }
}