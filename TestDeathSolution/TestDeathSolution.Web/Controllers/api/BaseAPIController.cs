using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Response;

namespace TestDeathSolution.Web.Controllers.api
{
    public class BaseApiController : ApiController
    {

        public HttpResponseMessage CreateErrorResponse()
        {

            Dictionary<string, string[]> errorList = ModelState.Where(ms => ms.Value.Errors.Count > 0).ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

            var list = errorList.Select((key) => $"{key.Key}:{ String.Join(",", key.Value) }").ToList();

            return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse(list));
        }
    }
}
