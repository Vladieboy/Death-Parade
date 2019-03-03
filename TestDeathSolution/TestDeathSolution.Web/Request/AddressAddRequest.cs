using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestDeathSolution.Web.Request
{
    public class AddressAddRequest
    {
        public string Value { get; set; }

        public int UserId { get; set; }

        public double Lat { get; set; }

        public double Long { get; set; }

        public string AddressCategory { get; set; }

    }
}