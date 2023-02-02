using CoreWebApi.Context;
using CoreWebApi.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.Common;
using System.Runtime.Intrinsics.Arm;

namespace CoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly mytestdbContext _context;

        public DepartmentController(mytestdbContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            List<Department> result;
            using (var db = _context)
            {
                result = db.Departments.ToList();
            }
            return new JsonResult(result);
        }

        [HttpPost]
        public JsonResult Create(Department dep)
        {
            using (var db = _context)
            {
                db.Departments.Add(dep);
                db.SaveChanges();
            }
            return new JsonResult("Created Successfully");
        }

        [HttpPut]
        public JsonResult Update(Department dep)
        {
            var exist = _context.Departments.FirstOrDefault(o => o.DepartmentId == dep.DepartmentId);
            if (exist == null)
            {
                _context.Departments.Add(dep);
            }
            else
            {
                exist.DepartmentName = dep.DepartmentName;
            }
            _context.SaveChanges();

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            using (var db = _context)
            {
                var exist = _context.Departments.FirstOrDefault(o => o.DepartmentId == id);
                if (exist != null)
                {
                    db.Remove(exist);
                    db.SaveChanges();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
