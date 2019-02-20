using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Services;

namespace TestDeathSolution.Web.Controllers.api
{
    [RoutePrefix("api/familiar")]
    public class FamiliarAPIController : ApiController
    {
        readonly IFamiliarService familiarService;


        public FamiliarAPIController(IFamiliarService familiarService)
        {
            this.familiarService = familiarService;
        }

        [Route, HttpGet]
        public string Test()
        {
            return "hello World";
        }

        [Route("familiars"), HttpGet]
        public List<Familiar> Select()
        {
            FamiliarService familiarService = new FamiliarService();

            List<Familiar> familiars = familiarService.Select();


            return familiars;
        }

    }
}
