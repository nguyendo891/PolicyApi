using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReceiptCookbookApi.Models
{
    public class Policy
    {
        public int PolicyId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImagePath { get; set; }

        [JsonIgnore]
        public string TokenId { get; set;}

        [Required]
        public ICollection<SubPolicy> SubPolicies { get; set; }
    }
}