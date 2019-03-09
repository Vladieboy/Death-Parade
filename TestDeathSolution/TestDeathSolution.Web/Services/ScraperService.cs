using AngleSharp.Parser.Html;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Provider;

namespace TestDeathSolution.Web.Services
{
    public class ScraperService : IScraperService
    {
        private readonly IDataProvider _dataProvider;

        public ScraperService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public List<OccultSymbols> GetOccultSymbols()
        {
            string url = "https://en.wikipedia.org/wiki/List_of_Occult_symbols";
            List<OccultSymbols> results = new List<OccultSymbols>();

            using (var client = new HttpClient())
            {
                var html = client.GetStringAsync(url).Result;
                var parser = new HtmlParser();
                var document = parser.Parse(html);

                var table = document.QuerySelector(".wikitable");
                var rows = table.QuerySelectorAll("tr").Skip(1);

                foreach (var row in rows)
                {
                    var occultSymbols = new OccultSymbols();

                    occultSymbols.Name = row.QuerySelector("td").TextContent;

                    occultSymbols.Image = row.QuerySelector("td > a").GetAttribute("href");

                    occultSymbols.Origins = row.QuerySelectorAll("td").Skip(2).First().TextContent;

                    results.Add(occultSymbols);
                }
            }
            return results;

        }

        public List<CurrentGothReddit> GetCurrentGothReddits()
        {
            string url = "https://old.reddit.com/r/occult/";
            List<CurrentGothReddit> results = new List<CurrentGothReddit>();

            using (var client = new HttpClient())
            {
                var html = client.GetStringAsync(url).Result;
                var parser = new HtmlParser();
                var siteTable = parser.Parse(html).QuerySelectorAll("#siteTable > .thing").Skip(1);

                foreach (var item in siteTable)
                {
                    var gothReddit = new CurrentGothReddit();

                    gothReddit.Title = item.QuerySelector(".entry > .top-matter > .title > .may-blank").TextContent;

                    var aElem = item.QuerySelector("a");

                    if (aElem != null)
                    {
                        url = aElem.GetAttribute("href");
                        Trace.WriteLine(url);

                    }
                    else
                    {
                        url = null;
                    }
                    gothReddit.Image = url;
                    results.Add(gothReddit);
                }
                return results;
            }
        }

        public List<EsotericHoroscope> GetEsotericHoroscopes()
        {
            string url = "http://www.alunamichaels.com/esoteric-horoscope/";
            List<EsotericHoroscope> results = new List<EsotericHoroscope>();

            using (var client = new HttpClient())
            {
                var html = client.GetStringAsync(url).Result;
                var parser = new HtmlParser();
                var document = parser.Parse(html).QuerySelectorAll("article > div.entry-content.cf > p > span");

                foreach (var item in document)
                {
                    var horoscope = new EsotericHoroscope();

                    horoscope.Horoscope = item.QuerySelector("span").TextContent;

                    results.Add(horoscope);
                }

            }
            return results;
        }

    }
}