using System;
using System.Linq;
using System.Collections.Generic;
using System.Web;

using LearningExamples;

using Newtonsoft.Json;

using ProcessThreadTask;
using Newtonsoft.Json.Serialization;
using System.Net.Http;
using HtmlAgilityPack;
using System.Threading.Tasks;
using System.Dynamic;

using System.Reflection;
using System.Diagnostics.Contracts;
using ConsoleApp1.Tests;
using System.Drawing;
using ObservableStart;
using System.IO;

namespace ConsoleApp1
{
	enum MyEnum
	{
		tmp1, tmp2
	}
	class Program
    {

		static void Main(string[] args)
		{
			Console.WriteLine("Hello World! Main");
			Task.Run(tests).Wait();
			
			Exit();

		}

		private static DateTime Min(DateTime date1, DateTime date2)
		{
			return (date1.CompareTo(date2) < 0) ? date1: date2;
		}


		private static void LazyLoading_ExceptionHandeling()
		{
			Lazy<int> LazyWrapper = new Lazy<int>(() =>
			{
				// error case
				throw new Exception("test Exception in Lazy");

				// return case
				//return 5;
			});

			try
			{
				Console.WriteLine("Lazy Wrapper test: " + LazyWrapper.Value);

			}
			catch (Exception ex)
			{
				Console.WriteLine("Lazy Wrapper error: " + ex.Message);
			}
		}

		private static void EnumGetValues()
		{
			var t = ENumType.Option3;

			// need to convert to index, not to enum value.
			int index = Array.IndexOf(Enum.GetValues(t.GetType()), t);

			Console.WriteLine("t-index: " + (index));
			Console.WriteLine("t-value: " + (int)t);
		}

		private static void ColorTranslatorToHtml()
		{
			var MainColorInt = "-16777216";
			var mainColor = Color.FromArgb(Convert.ToInt32(MainColorInt));
			var hexMainColor = ColorTranslator.ToHtml(mainColor);
			Console.WriteLine("hexMainColor, " + hexMainColor);
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



		static async Task tests()
		{
			Console.WriteLine("tests: ");

			// tests of Process, Thread, Task
			//ProcessThreadTaskTest.Run();

			// Display powers of 2 up to the exponent of 3:
			//YieldExample.Run();

			//YieldExample.TestPower();

			//ToStringTest();

			//Console.WriteLine("long.MaxValue, "+ long.MaxValue);

			//QueryStringBuilderTest();


			//Serialize();

			//HttpScannersManager.Run();

			//MyRedis.Run();

			//ColorTranslatorToHtml();

			//EnumGetValues();

			//LazyLoading_ExceptionHandeling();

			//AnonymousLikeDataStruct.test();

			//DateTimeFormatExample.run();

			//var e = new ArgumentException();
			//Console.WriteLine(e.GetType().FullName);

			// enum to string
			//MyEnum t = MyEnum.tmp1;
			//Console.WriteLine(t.ToString());

			//int y = 10_0_0;
			//Console.WriteLine(y.ToString());

			//await System_Threading_Channels.Main();

			//ObservableTests.Tests();

			//StringBuilderTester.run();

			/*var _a = new A();
			B.Func((B)_a);*/

			List<int> lst = null;
			// Error: One or more errors occurred. (Value cannot be null. (Parameter 'source'))
			//var t = lst.FirstOrDefault();
			//Console.WriteLine(t);

			// Error: Object reference not set to an instance of an object
			//foreach (var item in lst) { Console.WriteLine(item); }

			// Error: Object reference not set to an instance of an object
			//lst.ForEach((item) => { Console.WriteLine(item); });

			//Console.WriteLine(int.MaxValue);

		}

		static void Exit()
		{
            Console.WriteLine("Press any key to continue Main");
            Console.ReadKey(false);
            //Console.WriteLine("ReadKey");
        }

    }

	public enum ENumType
	{
		Option1 = 1,
		Option2 = 2,
		Option3 = 4,
	}

	public class Programssss {
        public string name = "som e namesss";
    }

	public static class ExpandObjectExtensions
	{
		public static TObject ToObject<TObject>(this IDictionary<string, object> someSource, BindingFlags bindingFlags = BindingFlags.Instance | BindingFlags.Public)
			   where TObject : class, new()
		{
			Contract.Requires(someSource != null);
			TObject targetObject = new TObject();
			Type targetObjectType = typeof(TObject);

			// Go through all bound target object type properties...
			foreach (PropertyInfo property in
						targetObjectType.GetProperties(bindingFlags))
			{
				// ...and check that both the target type property name and its type matches
				// its counterpart in the ExpandoObject
				if (someSource.ContainsKey(property.Name)
					&& property.PropertyType == someSource[property.Name].GetType())
				{
					property.SetValue(targetObject, someSource[property.Name]);
				}
			}

			return targetObject;
		}
	}

	/*class A
	{
		public int num { get; set; } = 4;


	}

	class B: A
	{
		public static void Func(B Item)
		{
			Console.WriteLine(Item.num + "-" + Item.num2);

		}
		public int num2 { get; set; } = 44;

		public static explicit operator B(A item)
		{
			return new B() { num = item.num };
		}

	}*/
}
