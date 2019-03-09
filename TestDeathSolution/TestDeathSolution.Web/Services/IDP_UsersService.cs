using TestDeathSolution.Web.Requests;

namespace TestDeathSolution.Web.Services
{
    public interface IDP_UsersService
    {
        int Insert(Users_AddRequest model);
        bool LogIn(Users_AddRequest model);
    }
}