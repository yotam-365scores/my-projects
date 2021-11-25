using System;
using System.Collections.Generic;
// System.Linq.Enumerable
using System.Linq;

using HelperClassLibrary;

namespace LearningExamples
{
	// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield
	public static class YieldExample
	{
		public static void Run()
		{
			//TestPower();
			
			TestStaticIEnumerableHelper();
		}

		public static void TestStaticIEnumerableHelper()
		{
			//System.Linq.Enumerable.Range()
			//var arr = StaticHelper.GetArr(1, 17);
			var arr = System.Linq.Enumerable.Range(1, 17);

			// Foreach Syntax
			//foreach (var Item in arr)
			//{
			//	Console.WriteLine("item: {0} ", Item);
			//	if (Item > 3)
			//	{
			//		Console.WriteLine("item > 3: {0} ", Item);
			//		if (Item > 7)
			//		{
			//			Console.WriteLine("item > 7: {0} ", Item);
			//			var Maped = Item.ToString() + " Maped.";
			//			Console.WriteLine("item after map: {0} ", Maped);
			//		}
			//	}
			//}

			arr
				// 
				.Foreach(Item => Console.WriteLine("item: {0} ", Item))
					// item > 3
					.Filter(Item => Item > 3)
					.Foreach(Item => Console.WriteLine("item > 3: {0} ", Item))

						// item > 7
						.Filter(Item => Item > 7)
						.Foreach(Item => Console.WriteLine("item > 7: {0} ", Item))

							// map to string
							.Map(Item => Item.ToString() + " Maped.")
							.Foreach(Item => Console.WriteLine("item after map: {0} ", Item))

				.Done();

		}

		public static void TestPower()
		{
			// Display powers of 2 up to the exponent of 8:
			var PowerArr = YieldExample
				.Power(2, 3)
				.Filter(x => x <= 4)
				.Foreach(x => Console.WriteLine("in Foreach, x: " + x))

				.Filter(x => x < 4)
				.Foreach(x => Console.WriteLine("in Foreach x < 4, x: " + x))
				;

			//PowerArr.Foreach();
			foreach (int num in PowerArr)
			{
				Console.WriteLine("in Run, num: {0} ", num);
			}

		}

		public static IEnumerable<int> Power(int number, int exponent)
		{
			int result = 1;

			for (int i = 0; i < exponent; i++)
			{
				result = result * number;
				yield return result;
			}
		}

	}
}
