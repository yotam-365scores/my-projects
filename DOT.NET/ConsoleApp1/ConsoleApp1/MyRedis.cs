using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

using StackExchange.Redis;

namespace ConsoleApp1.Tests
{
	public class MyRedis
	{
		public static void Run()
		{
			var myRedis = new MyRedis();
			var db = myRedis.Redis.GetDatabase();
			var address = "";
			var port = 6379;
			var server = myRedis.Redis.GetServer(address, port);

			string monitorKey = "scanners::monitor::";

			var Keys = server.Keys(pattern: monitorKey + "*")
				.Select(k => k.ToString());

			// has Keys
			Console.WriteLine("Keys: " + string.Join(',', Keys));

			var scannersList = Keys
				.Select((key) => {
					var value = db.StringGetAsync(key).Result;
					var Pair = KeyValuePair.Create(key, value);
					return Pair;
				});

		}
		// inline initialize.
		// address + port
		public ConnectionMultiplexer Redis { get { return ConnectionMultiplexer.Connect(""); } }

	}
}
