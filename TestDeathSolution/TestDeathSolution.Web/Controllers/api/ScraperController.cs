using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestDeathSolution.Web.Services;

namespace TestDeathSolution.Web.Controllers.api
{
    [RoutePrefix("api/scraper")]
    public class ScraperController : BaseApiController
    {
        readonly private IScraperService _scraperService;

        public ScraperController(IScraperService scraperService)
        {
            _scraperService = scraperService;
        }

        [Route("symbols"), HttpGet]
        public HttpResponseMessage GetOccultSymbols()
        {

            var resp = _scraperService.GetOccultSymbols();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("reddit"), HttpGet]
        public HttpResponseMessage GetCurrentGothReddits()
        {

            var resp = _scraperService.GetCurrentGothReddits();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("horoscope"), HttpGet]
        public HttpResponseMessage GetEsotericHoroscopes()
        {

            var resp = _scraperService.GetEsotericHoroscopes();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}
