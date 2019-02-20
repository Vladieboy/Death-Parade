using System.Collections.Generic;
using TestDeathSolution.Web.Domain;

namespace TestDeathSolution.Web.Services
{
    public interface IFamiliarService
    {
        List<Familiar> Select();
    }
}