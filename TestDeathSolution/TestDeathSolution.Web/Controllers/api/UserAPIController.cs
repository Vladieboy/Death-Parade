using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TestDeathSolution.Web.Controllers.api
{
    [RoutePrefix("api")]
    public class UserAPIController : ApiController
    {
        [Route, HttpGet]
        public HttpResponseMessage Hello()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "suckuss");
        }
    }
}
