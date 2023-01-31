using CoreWebApi.Context;
using CoreWebApi.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Runtime.Intrinsics.Arm;

namespace CoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly mytestdbContext _context;

        public EmployeeController(mytestdbContext context, IConfiguration configuration,IWebHostEnvironment env)
        {
            _configuration = configuration;
            _context = context;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            using var db = _context;
            var result = db.EmployeeList.FromSqlRaw("select * from TF_GetEmployees()").ToList();
            return new JsonResult(result);
        }

        [HttpPost]
        public JsonResult Create(Employee ep)
        {
            using (var db = _context)
            {
                db.Employees.Add(ep);
                db.SaveChanges();
            }
            return new JsonResult("Created Success");
        }

        [HttpPut]
        public JsonResult Update(Employee ep)
        {
            var exist = _context.Employees.FirstOrDefault(o => o.EmployeeId == ep.EmployeeId);
            if (exist == null)
            {
                _context.Employees.Add(ep);
            }
            else
            {
                exist.EmployeeName = ep.EmployeeName;
                exist.Department = ep.Department;
                exist.DateOfJoining = ep.DateOfJoining;
                exist.PhotoFileName = ep.PhotoFileName;
            }
            _context.SaveChanges();

            return new JsonResult("Updated Success");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            using (var db = _context)
            {
                var exist = _context.Employees.FirstOrDefault(o => o.EmployeeId == id);
                if (exist != null)
                {
                    db.Remove(exist);
                    db.SaveChanges();
                }
            }
            return new JsonResult("Deleted Success");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }catch(Exception e)
            {
                Console.WriteLine(e);
                return new JsonResult("anonymous.png");
            }
        }
    }
}
