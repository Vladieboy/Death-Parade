using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestDeathSolution.Web.Responses
{
    public class SuccessResponse : BaseResponse
    {
        public SuccessResponse()
        {
            this.IsSuccessful = true;
        }
    }
}