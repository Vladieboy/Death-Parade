using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestDeathSolution.Web.Response
{
    public class ItemResponse<T> : SuccessResponse
    {

        public T Item { get; set; }

    }
}