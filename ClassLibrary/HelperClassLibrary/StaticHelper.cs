using System;
using System.Collections.Generic;

namespace HelperClassLibrary
{
	// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield

	public static class StaticHelper
	{
		public static IEnumerable<int> GetArr(int start, int end)
		{
			//var arr = new List<int> { };
			for (int Index = start; Index < end; Index++)
			{
				//Console.WriteLine("in GetArr, Index:" + Index);
				yield return Index;
				//arr.Add(Index);
			}
			//return arr;
		}

		//public static IEnumerable<TypeIndex<Typ>> Filter<Typ>(this IEnumerable<Typ> arr, Predicate<Typ> isShow)
		public static IEnumerable<Typ> Filter<Typ>(this IEnumerable<Typ> arr, Predicate<Typ> isShow)
		{
			//var Index = 0;
			foreach (Typ Item in arr)
			{
				//Console.WriteLine("in Filter, Index: {0};", Item);

				if (isShow(Item))
				{
					//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
					yield return Item;
				}
				//Index++;
			}

		}

		public static IEnumerable<OutTyp> Map<InTyp, OutTyp>(this IEnumerable<InTyp> arr, Func<InTyp, OutTyp> Pipe)
		{
			foreach (InTyp Item in arr)
			{
				//Console.WriteLine("in Map, Index: {0};", Item);
				//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
				yield return Pipe(Item);
			}

		}

		public static IEnumerable<Typ> Foreach<Typ>(this IEnumerable<Typ> arr, Action<Typ> act)
		{
			//var Index = 0;
			foreach (Typ Item in arr)
			{
				//Console.WriteLine("in Foreach, Index: {0};", Item);

				if (act != null)
				{
					//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
					act.Invoke(Item);
					yield return Item;
				}
				//Index++;
			}

		}

		public static void Done<Typ>(this IEnumerable<Typ> arr)
		{
			foreach (var Item in arr)
			{
				//Console.WriteLine("in Done, Index: {0};", Item);

			} // run on array, to start the running.
		}

	}
}
