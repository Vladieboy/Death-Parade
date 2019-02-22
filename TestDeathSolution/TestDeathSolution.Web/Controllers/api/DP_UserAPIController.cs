using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Request;
using TestDeathSolution.Web.Response;
using TestDeathSolution.Web.Services;

namespace TestDeathSolution.Web.Controllers.api
{
    [RoutePrefix("api/paraders")]
    public class DP_UserAPIController : BaseApiController
    {
        readonly private IDPUserService _dpUserService;

        public DP_UserAPIController(IDPUserService dpUserService)
        {
            _dpUserService = dpUserService;
        }

        //[Route("{userName:string}"), HttpGet]
        //public HttpResponseMessage SelectByUserName(string userName)
        //{
        //    ItemResponse<DPUsersModel> resp = new ItemResponse<DPUsersModel>()
        //    {
        //        Item = _dpUserService.SelectByUserName(userName)
        //    };

        //    return Request.CreateResponse(HttpStatusCode.OK, resp);
        //}

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage SelectById(int id)
        {
            ItemResponse<DPUsersModel> resp = new ItemResponse<DPUsersModel>()
            {
                Item = _dpUserService.SelectById(id)
            };

            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route, HttpPost]
        public HttpResponseMessage Insert(dbUserAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> resp = new ItemResponse<int>()
            {
                Item = _dpUserService.Insert(model)
            };

            return Request.CreateResponse(HttpStatusCode.Created, resp);
        }
    }
}

