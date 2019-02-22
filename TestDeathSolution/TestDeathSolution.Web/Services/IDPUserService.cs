using TestDeathSolution.Web.Domain;
using TestDeathSolution.Web.Request;

namespace TestDeathSolution.Web.Services
{
    public interface IDPUserService
    {
        //DPUsersModel SelectByUserName(string userName);

        DPUsersModel SelectById(int id);

        int Insert(dbUserAddRequest model);
    }
}