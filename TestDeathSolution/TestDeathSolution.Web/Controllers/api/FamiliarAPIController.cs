using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Response;
using TestDeathSolution.Web.Services;

namespace TestDeathSolution.Web.Controllers.api
{
    /*
     * myService = new Service(??);
     * authService = new AuthService(??);
     TestAuthController mycoolcontroller = new TestAuthController(myService, auth, principal);
     */


    [RoutePrefix("api/familiar")]
    public class FamiliarAPIController : BaseApiController
    {
        //Step 2 : make readonly to hold instance
        //keeps it for safekeeping later
        readonly private IFamiliarService _familiarService;

        //Step 1: nake a parameter on your constructor fir servuce
        public FamiliarAPIController(IFamiliarService familiarService)
        {
            //Step 3: assign paramete of your constructor to the field
            _familiarService = familiarService;
        }


        [Route, HttpGet]
        public string Test()
        {
            return "hello World";
        }

        [Route("familiars"), HttpGet]
        public HttpResponseMessage Select()
        {
            ItemsResponse<Familiar> resp = new ItemsResponse<Familiar>();
            resp.Items = _familiarService.Select();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }



        [Route("cantrips"), HttpGet]
        public HttpResponseMessage GetCantrips()
        {
            var results = _familiarService.GetCantrips();
            return Request.CreateResponse(HttpStatusCode.OK, results);
        }


    }
}
