using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Request;
using TestDeathSolution.Web.Response;

namespace TestDeathSolution.Web.Controllers.api
{
    [AllowAnonymous]
    [RoutePrefix("api/routes")]
    public class RoutesAPIController : ApiController
    {
        [Route, HttpPut]
        public HttpResponseMessage GetRoute(RouteRequest model)
        {
            WebClient client = new WebClient();
            ItemResponse<string> response = new ItemResponse<string>();
            response.Item = client.DownloadString(model.Url);
            return Request.CreateResponse(HttpStatusCode.OK, response);



        }
    }
}
