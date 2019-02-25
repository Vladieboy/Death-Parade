using System.Collections.Generic;
using TestDeathSolution.Web.Domain;

namespace TestDeathSolution.Web.Services
{
    public interface IScraperService
    {
        List<OccultSymbols> GetOccultSymbols();

        List<CurrentGothReddit> GetCurrentGothReddits();
    }
}