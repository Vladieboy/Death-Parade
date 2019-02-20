using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Domain;

namespace TestDeathSolution.Web.Services
{
    public class FamiliarService : IFamiliarService
    {

        public List<Familiar> Select()
        {
            string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            // creates live connection to SQL server when using code
            using (SqlConnection conn = new SqlConnection(connString))
            {
                List<Familiar> familiars = new List<Familiar>();


                //opens the db connection
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();

                cmd.CommandText = "FamiliarTypes_Select";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                //goes through each record
                using (SqlDataReader reader = cmd.ExecuteReader())
                {

                    // while data exists, continue to read
                    while (reader.Read())
                    {


                        //convert whatever comes out of c#
                        Familiar familiar = new Familiar()
                        {
                            Id = (int)reader["Id"],
                            Name = (string)reader["Name"],
                            DemonType = (string)reader["DemonType"],
                            Age = (int)reader["Age"]
                        };

                        familiars.Add(familiar);
                    }
                }
                return familiars;
            }
        }




    }
}