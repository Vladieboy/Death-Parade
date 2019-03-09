using System.Collections.Generic;
using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Models;
using TestDeathSolution.Web.Request;

namespace TestDeathSolution.Web.Services
{
    public interface IAddressService
    {
        int Insert(AddressAddRequest address);

        List<Address> GetAll();

        Address Get(int addressId);

        Paged<Address> Get(AddressPageRequest pages);

        void Update(AddressUpdateRequest address);

        void Delete(int addressId);
    }
}