using System;
using System.Linq;
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

		#region Foreach-Map-Yield Region
		/* // Map with same return
		public static IEnumerable<Typ> ForeachYield<Typ>(this IEnumerable<Typ> arr, Action<Typ> actionToDo)
		{
			//var Index = 0;
			foreach (Typ Item in arr)
			{
				//Console.WriteLine("in Foreach, Index: {0};", Item);

				if (actionToDo != null)
				{
					//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
					actionToDo(Item);
				}
				yield return Item;
				//Index++;
			}

		}*/

		/// <summary>
		/// actionToDo on InTyp and convert to OutTyp
		/// </summary>
		/// <typeparam name="InTyp">In item type</typeparam>
		/// <typeparam name="OutTyp">Out item type</typeparam>
		/// <param name="arr">list of InTyp items</param>
		/// <param name="Pipe">convert from In item type to Out item type</param>
		/// <returns>arr after items change, can get each item by yield</returns>
		public static IEnumerable<OutTyp> Map<InTyp, OutTyp>(this IEnumerable<InTyp> arr, Func<ForeachData<InTyp>, OutTyp> Pipe)
		{
			/*			
			return arr.Map((ForeachData = { Item, Index, Array }) =>
			{
				//Console.WriteLine("in Map, Item: {0};", Item);
				return Item;
			}); */
			var Index = 0;
			var foreachData = ForeachData<InTyp>.HasArray(arr);
			foreach (InTyp Item in arr)
			{
				//Console.WriteLine("in Map, Index: {0};", Item);
				//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
				yield return Pipe(foreachData.HasItem(Item, Index));
				Index++;
			}

		}


		/// <summary>
		/// actionToDo on Typ on main item
		/// </summary>
		/// <typeparam name="Typ">item type</typeparam>
		/// <param name="arr">list of Typ items</param>
		/// <param name="actionToDo">actionToDo on each item type</param>
		/// <returns>arr after items actionToDo, can get each item by yield</returns>
		public static IEnumerable<Typ> ForeachYield<Typ>(this IEnumerable<Typ> arr, Action<ForeachData<Typ>> actionToDo)
		{
			return arr
				.Map(x => { actionToDo(x); return x.Item; });
		}

		/// <summary>
		/// actionToDo on Typ on sub item
		/// </summary>
		/// <typeparam name="Typ">item type</typeparam>
		/// <param name="arr">list of Typ items</param>
		/// <param name="actionToDo">actionToDo on each item type</param>
		/// <returns>arr after items actionToDo, can NOT get each item by yield</returns>
		public static IEnumerable<Typ> Foreach<Typ>(this IEnumerable<Typ> arr, Action<ForeachData<Typ>> actionToDo)
		{
			return arr
				.ForeachYield(actionToDo)
				.ToList();
		}

		#endregion


		#region Filter Region
		//public static IEnumerable<TypeIndex<Typ>> Filter<Typ>(this IEnumerable<Typ> arr, Predicate<Typ> isShow)
		public static IEnumerable<Typ> Filter<Typ>(this IEnumerable<Typ> arr, Predicate<ForeachData<Typ>> isShow)
		{
			var foreachData = ForeachData<Typ>.HasArray(arr);
			var Index = 0;
			foreach (Typ Item in arr)
			{
				//Console.WriteLine("in Filter, Index: {0};", Item);
				if (isShow(foreachData.HasItem(Item, Index)))
				{
					//yield return new TypeIndex<Typ>() { Index=Index, Item=Item };
					yield return Item;
				}
				Index++;
				//else { yield return Item; }
			}

		}

		public static IEnumerable<Typ> FilterAct<Typ>(this IEnumerable<Typ> arr, FilterList<Typ> filterAct)
		{
			return filterAct.Run(arr);
		}
		
		#endregion


		public static IEnumerable<Typ> Done<Typ>(this IEnumerable<Typ> arr)
		{
			return arr.ToList(); // run on array, to start the running (pull).
		}
	}

}
