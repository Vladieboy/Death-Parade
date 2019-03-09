using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Interfaces;

namespace TestDeathSolution.Web.Domain
{
    public class UserData : IUserAuthData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}