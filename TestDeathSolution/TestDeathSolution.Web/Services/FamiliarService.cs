using AngleSharp.Parser.Html;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Provider;

namespace TestDeathSolution.Web.Services
{
    public class FamiliarService : IFamiliarService
    {
        private readonly IDataProvider _dataProvider;

        public FamiliarService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }


        public List<Familiar> Select()
        {

            List<Familiar> familiarsList = null;
            string storedProc = "FamiliarTypes_Select";

            Action<IDataReader, short> sRecordMapper = delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Familiar familiar = new Familiar()
                {
                    Id = reader.GetInt32(startingIndex++),
                    Name = reader.GetString(startingIndex++),
                    DemonType = reader.GetString(startingIndex++),
                    Age = reader.GetInt32(startingIndex++)
                };
                if (familiarsList == null)
                {
                    familiarsList = new List<Familiar>();
                }
                familiarsList.Add(familiar);
            };
            _dataProvider.ExecuteCmd(storedProc, null, sRecordMapper);
            return familiarsList;
        }


        public List<Cantrips> GetCantrips()
        {
            string url = "https://dnd5e.fandom.com/wiki/Warlock_Spells";
            List<Cantrips> results = new List<Cantrips>();

            using (var client = new HttpClient())
            {
                var html = client.GetStringAsync(url).Result;
                var parser = new HtmlParser();
                var document = parser.Parse(html);
                var siteTable = document.QuerySelector("table");

                var rows = siteTable.QuerySelectorAll("tr").Skip(1);

                foreach (var row in rows)
                {
                    var cantrips = new Cantrips();

                    var sName = row.QuerySelector("td");
                    cantrips.Name = sName.TextContent;

                    //var sSchool = row.QuerySelector("tr > ");
                    //cantrips.School = sSchool.TextContent;

                    results.Add(cantrips);
                };
                return results;
            }
        }

        private void Main(string[] args)
        {

            var results = new List<DotNetVersion>();
            //1 download html for page:
            //https://en.wikipedia.org/wiki/.NET_Framework


            var webClient = new WebClient();
            var html = webClient.DownloadString("https://en.wikipedia.org/wiki/.NET_Framework");


            //2 user css selectors to find the table
            var parser = new HtmlParser();
            var document = parser.Parse(html);
            var table = document.QuerySelector(".wikitable:not(.plainrowheaders)");

            //3 loop over every row and ceate an object for each row
            var rows = table.QuerySelectorAll("tr").Skip(2);

            foreach (var row in rows)
            {
                var dotNetVersion = new DotNetVersion();
                dotNetVersion.Version = row.QuerySelector("td").TextContent;
                dotNetVersion.ClrVersion = row.QuerySelector("td:nth-child(2)").TextContent;
                //dotNetVersion.ReleaseDate = row.QuerySelector("td:nth-child(2)").TextContent;
                dotNetVersion.ReleaseDate = row.QuerySelectorAll("td").Skip(2).First().TextContent;

                results.Add(dotNetVersion);
            }


            //4 print out the results
            foreach (var item in results)
            {
                Console.WriteLine($"Version={item.Version}, CLR version={item.ClrVersion}, release date={item.ReleaseDate}");
            }
        }

    }



}
