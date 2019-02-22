using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestDeathSolution.Web.Response
{
    public class SuccessResponse : BaseResponse
    {
        public SuccessResponse()
        {

            this.IsSuccessful = true;
        }
    }
}