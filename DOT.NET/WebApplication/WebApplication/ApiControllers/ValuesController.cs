using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.ApiControllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ValuesController : ControllerBase
	{
		// https://localhost:44304/api/values
		// GET: api/<ValuesController>
		[HttpGet]
		public IEnumerable<object> Get()
		{
			var optionsGroup = new object[] {
				new { label = "Tent", value = "Tent" },
				new { label = "Flashlight", value = "Flashlight" },
				new { label = "Toilet Paper", value = "Toilet Paper" },
				new { label = "Not available", value = "Not available", isDisabled = true }
};

			//return new string[] { "value1", "value2" };
			return optionsGroup;
		}

		// GET api/<ValuesController>/5
		[HttpGet("{id}")]
		public string Get([FromQuery] int id)
		{
			return "value";
		}

		// POST api/<ValuesController>
		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		// PUT api/<ValuesController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<ValuesController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
