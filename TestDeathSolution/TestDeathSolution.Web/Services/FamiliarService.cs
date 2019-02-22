using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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




    }
}