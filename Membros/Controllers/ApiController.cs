using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using System;

namespace Membros.Controllers {
    public class ApiController : Controller {
        private readonly ILogger<HomeController> _logger;

        public ApiController(ILogger<HomeController> logger) {
            _logger = logger;
        }
        
        [HttpGet("api/members")]
        public async Task<JsonResult> AllMembers() {
            using (var connection = new SqlConnection(Environment.GetEnvironmentVariable("DBCONN"))) {
                var results = await connection
                                .QueryAsync("select * from vwMembersPanel order by case when domain_id = 10 then 0 else domain_id end, baaisi_date, admission_date, birth_date desc")
                                .ConfigureAwait(true);

                return Json(results);
            }            
        }
    }
}
