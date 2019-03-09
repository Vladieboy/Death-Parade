using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Provider;
using TestDeathSolution.Web.Request;

namespace TestDeathSolution.Web.Services
{
    public class DPUserService : IDPUserService
    {
        private readonly IDataProvider _dp;



        public DPUserService(IDataProvider dataProvider)
        {
            _dp = dataProvider;
        }

        //public bool LogIn(string userName, string password)
        //{
        //    bool isSuccessful;

        //    IUserAuthData resp = SelectByUserName(userName, password);


        //}

        public DPUsersModel SelectByUserName(string userName)
        {
            DPUsersModel model = new DPUsersModel();
            string storedProc = "[dbo].[DB_Users_SelectByUserName]";

            Action<SqlParameterCollection> iParamMapper = delegate (SqlParameterCollection paramCollec)
            {
                paramCollec.AddWithValue("@UserName", userName);
            };



            Action<IDataReader, short> singleRecordMapper = delegate (IDataReader reader, short set)
             {
                 int startingIndex = 0;
                 model.UserName = reader.GetString(startingIndex++);

                 model.Id = reader.GetInt32(startingIndex++);
             };



            _dp.ExecuteCmd(storedProc, iParamMapper, singleRecordMapper);
            return model;

        }
        public int Insert(dbUserAddRequest model)
        {
            int id = 0;
            string storedProc = "[dbo].[DB_Users_Insert]";

            Action<SqlParameterCollection> iParamMapper = delegate (SqlParameterCollection paramCollec)
            {
                paramCollec.AddWithValue("@UserName", model.UserName);
                paramCollec.AddWithValue("@Password", model.Password);

                SqlParameter idParameter = new SqlParameter("@Id", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                paramCollec.Add(idParameter);
            };

            Action<SqlParameterCollection> rParams = delegate (SqlParameterCollection param)
            {
                Int32.TryParse(param["@Id"].Value.ToString(), out id);
            };
            _dp.ExecuteNonQuery(storedProc, iParamMapper, rParams);
            return id;
        }



        public DPUsersModel SelectById(int id)
        {
            DPUsersModel model = new DPUsersModel();
            string storedProc = "[dbo].[DP_Users_SelectById]";

            Action<SqlParameterCollection> iParamMapper = delegate (SqlParameterCollection paramCollec)
            {
                paramCollec.AddWithValue("@Id", id);
            };

            Action<IDataReader, short> singleRecordMapper = delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                model.UserName = reader.GetString(startingIndex++);
                model.Password = reader.GetString(startingIndex++);
                model.Id = reader.GetInt32(startingIndex++);
            };

            _dp.ExecuteCmd(storedProc, iParamMapper, singleRecordMapper);
            return model;
        }
    }
}