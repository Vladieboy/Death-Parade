using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Models;
using TestDeathSolution.Web.Request;
using TestDeathSolution.Web.Response;
using TestDeathSolution.Web.Services;

namespace TestDeathSolution.Web.Controllers.api
{
    [RoutePrefix("api/address")]
    public class AddressAPIController : BaseApiController
    {
        readonly private IAddressService _addressService;

        public AddressAPIController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Insert(AddressAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> resp = new ItemResponse<int>
            {
                Item = _addressService.Insert(model)
            };

            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }


        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            ItemsResponse<Address> resp = new ItemsResponse<Address>()
            {
                Items = _addressService.GetAll()
            };

            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }


        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            _addressService.Delete(id);
            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }


        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage Get(int id)
        {
            ItemResponse<Address> resp = new ItemResponse<Address>()
            {
                Item = _addressService.Get(id)
            };
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }


        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, AddressUpdateRequest model)
        {
            _addressService.Update(model);
            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("pagination"), HttpPost]
        public HttpResponseMessage Paginate(AddressPageRequest page)
        {
            ItemResponse<Paged<Address>> resp = new ItemResponse<Paged<Address>>()
            {
                Item = _addressService.Get(page)
            };
            if (resp.Item == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, resp);
            }
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }



    }
}
