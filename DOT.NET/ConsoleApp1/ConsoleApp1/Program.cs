using System;
using System.Linq;
using System.Collections.Generic;
using System.Web;

using LearningExamples;

using Newtonsoft.Json;

using ProcessThreadTask;
using Newtonsoft.Json.Serialization;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
		{
			Console.WriteLine("Hello World! Main");

			// tests of Process, Thread, Task
			//ProcessThreadTaskTest.Run();

			// Display powers of 2 up to the exponent of 3:
			//YieldExample.Run();
			YieldExample.TestPower();
			//ToStringTest();

			//Console.WriteLine("long.MaxValue, "+ long.MaxValue);

			//QueryStringBuilderTest();


			//Serialize();

			Exit();

		}

		private static void Serialize()
		{
			var listStr = JsonConvert.SerializeObject(new { ID_NAME = "some name" }, Formatting.None, new JsonSerializerSettings()
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
				ContractResolver = new CamelCasePropertyNamesContractResolver(),
				TypeNameHandling = TypeNameHandling.Auto
			});

			Console.WriteLine(listStr);
		}

		private static void QueryStringBuilderTest()
		{
			var queryString = HttpUtility
				// Builder: best to start with empty string.
				.ParseQueryString(string.Empty);
				// Parser: only for parse perpuses.
				//.ParseQueryString("baseUri?GameStatuses=6");

			Console.WriteLine("queryString: " + queryString.ToString());

			//queryString.Add("SportifierGameStatusesFilter", GameStatuses.ToString());
			new List<int>() { 5, 3, 4 }.
				ForEach(num =>
					queryString.Add("GameStatuses", num.ToString())
				);

			// will remove them all
			//queryString.Remove("GameStatuses");

			
			var baseUri = "baseUri";

			// Builder: 
			var finalUri = string.Format(baseUri + "?{0}", queryString.ToString());

			// Parser: 
			//var finalUri = queryString.ToString();

			Console.WriteLine("ConfigUrl with queryString: " + finalUri);
		}


		private static void ToStringTest()
		{
			var p = new Programssss();
			Console.WriteLine("Programssss obj:" + p.ToString());
			Console.WriteLine("Programssss anonymous:" + new { p.name }.ToString());
		}


		static void Exit()
		{
            Console.WriteLine("Press any key to continue Main");
            Console.ReadKey(false);
            //Console.WriteLine("ReadKey");
        }

    }

    public class Programssss {
        public string name = "som e namesss";
    }
}
