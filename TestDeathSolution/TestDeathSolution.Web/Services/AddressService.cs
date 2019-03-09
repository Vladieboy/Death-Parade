using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Models;
using TestDeathSolution.Web.Provider;
using TestDeathSolution.Web.Request;

namespace TestDeathSolution.Web.Services
{
    public class AddressService : IAddressService
    {
        private readonly IDataProvider _dp;

        public AddressService(IDataProvider dataProvider)
        {
            _dp = dataProvider;
        }

        public int Insert(AddressAddRequest address)
        {
            int id = 0;
            string storedProc = "[dbo].[Addresses_Insert]";

            _dp.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection sqlParams)
                 {

                     sqlParams.AddWithValue("@Value", address.Value);
                     sqlParams.AddWithValue("@UserId", address.UserId);
                     sqlParams.AddWithValue("@Lat", address.Lat);
                     sqlParams.AddWithValue("@Long", address.Long);
                     sqlParams.AddWithValue("@AddressCategory", address.AddressCategory);
                     sqlParams.AddWithValue("@Notes", address.Notes);
                     SqlParameter idParam = new SqlParameter("@AddressId", System.Data.SqlDbType.Int);
                     idParam.Direction = System.Data.ParameterDirection.Output;

                     sqlParams.Add(idParam);


                 }, delegate (SqlParameterCollection sqlParams)
                 {
                     Int32.TryParse(sqlParams["@AddressId"].Value.ToString(), out id);
                 });


            return id;
        }

        public void Delete(int addressId)
        {
            string storedproc = "[dbo].[Addresses_Delete]";

            _dp.ExecuteNonQuery(storedproc
                , delegate (SqlParameterCollection sqlParameter)
                {
                    sqlParameter.AddWithValue("@AddressId", addressId);
                });
        }

        public void Update(AddressUpdateRequest address)
        {
            string storedProc = "[dbo].[Addresses_Update]";

            _dp.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection paramCollec)
                {

                    AddressUpdateMap(address, paramCollec);
                });
        }

        public List<Address> GetAll()
        {
            List<Address> addressList = new List<Address>();
            string storedProc = "[dbo].[Addresses_Select]";
            _dp.ExecuteCmd(storedProc, null
                , delegate (IDataReader reader, short set)
                {
                    Address address = AddressMapper(reader);

                    addressList.Add(address);
                });

            return addressList;
        }

        public Address Get(int addressId)
        {
            Address address = new Address();
            string storedProc = "[dbo].[Addresses_SelectById]";
            _dp.ExecuteCmd(storedProc
                , delegate (SqlParameterCollection sqlParameter)
                {
                    sqlParameter.AddWithValue("@AddressId", addressId);
                }, delegate (IDataReader reader, short set)
                {
                    address = AddressMapper(reader);
                });
            return address;
        }

        public Paged<Address> Get(AddressPageRequest pages)
        {
            int totalCount = 0;
            Paged<Address> resp = null;

            List<Address> addressList = new List<Address>();

            Action<SqlParameterCollection> inputParameters = delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pages.PageIndex);
                parameterCollection.AddWithValue("@PageSize", pages.PageSize);
            };

            Action<IDataReader, short> sRecordMapper = delegate (IDataReader reader, short set)
            {

                Address address = new Address();

                int startingIndex = 0;
                address.AddressId = reader.GetInt32(startingIndex++);
                address.Value = reader.GetString(startingIndex++);
                address.UserId = reader.GetInt32(startingIndex++);
                address.Lat = reader.GetDouble(startingIndex++);
                address.Long = reader.GetDouble(startingIndex++);
                address.AddressCategory = reader.GetString(startingIndex++);
                address.Notes = reader.GetString(startingIndex++);

                addressList.Add(address);
                totalCount = reader.GetInt32(0);

                if (addressList != null)
                {
                    resp = new Paged<Address>(addressList, pages.PageIndex, pages.PageSize, totalCount);
                }

            };


            string storedProc = "[dbo].[Addresses_Pagination]";

            _dp.ExecuteCmd(storedProc, inputParameters, sRecordMapper);
            return resp;


        }


        private static void AddressUpdateMap(AddressUpdateRequest address, SqlParameterCollection paramCollec)
        {
            paramCollec.AddWithValue("@AddressId", address.AddressId);
            paramCollec.AddWithValue("@Value", address.Value);
            paramCollec.AddWithValue("@Lat", address.Lat);
            paramCollec.AddWithValue("@Long", address.Long);
            paramCollec.AddWithValue("@AddressCategory", address.AddressCategory);
            paramCollec.AddWithValue("@Notes", address.Notes);
        }


        private static Address AddressMapper(IDataReader reader)
        {
            Address address = new Address();
            int startingIndex = 0;
            address.AddressId = reader.GetInt32(startingIndex++);
            address.Value = reader.GetString(startingIndex++);
            address.UserId = reader.GetInt32(startingIndex++);
            address.Lat = reader.GetDouble(startingIndex++);
            address.Long = reader.GetDouble(startingIndex++);
            address.AddressCategory = reader.GetString(startingIndex++);
            address.Notes = reader.GetString(startingIndex++);
            return address;
        }
    }
}