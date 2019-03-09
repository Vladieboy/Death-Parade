using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Interfaces;
using TestDeathSolution.Web.Requests;

namespace TestDeathSolution.Web.Services
{
    public class DP_UsersService
    {
        //private IAuthenticationService _authenticationService;
        private readonly IDataProvider _dataProvider;

        public DP_UsersService(IDataProvider dataProvider)
        //, IAuthenticationService authenticationService)
        {
            //_authenticationService = authenticationService;
            _dataProvider = dataProvider;
        }

        public int Insert(Users_AddRequest model)
        {
            int id = 0;
            string storedProc = "[dbo].[DB_Users_Insert]";

            _dataProvider.ExecuteNonQuery(storedProc
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@UserName", model.UserName);
                    sqlParams.AddWithValue("@Password", model.Password);

                    SqlParameter idParameter = new SqlParameter
                    ("@Id", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);
                }, returnParameters: delegate (SqlParameterCollection sqlParams)
                {
                    Int32.TryParse(sqlParams["@Id"].Value.ToString(), out id);
                });
            return id;
        }


        public bool LogIn(Users_AddRequest model)
        {
            bool isSuccessful = false;

            IUserAuthData resp = SelectByUserName(model.UserName, model.Password);

            if (resp != null)
            {
                isSuccessful = true;
            }
            return isSuccessful;
        }

        private UserData SelectByUserName(string userName, string password)
        {
            string PasswordRead = "";
            UserData authUser = null;
            DPUsers dPUsers = null;

            string storedProc = "[dbo].[DB_Users_SelectByUserName]";

            _dataProvider.ExecuteCmd(storedProc
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                 {
                     sqlParams.AddWithValue("@UserName", userName);
                 }
                 , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    dPUsers = new DPUsers();
                    int startingIndex = 0;

                    authUser = new UserData
                    {
                        Id = reader.GetInt32(startingIndex++),
                        Name = reader.GetString(startingIndex++)
                    };
                    PasswordRead = reader.GetString(startingIndex++);

                });
            if (PasswordRead == password)
            {
                return authUser;
            }
            return null;
        }

    }
}