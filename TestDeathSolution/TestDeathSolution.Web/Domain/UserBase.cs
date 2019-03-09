using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Models;

namespace TestDeathSolution.Web.Domain
{
    public class UserBase : IUserAuthData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}