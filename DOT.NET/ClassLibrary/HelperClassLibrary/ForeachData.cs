using System;
using System.Collections.Generic;
using System.Text;

namespace HelperClassLibrary
{
	public class ForeachData<Typ>
	{
		public static implicit operator Typ(ForeachData<Typ> foreachData) { return foreachData.Item; }
		public static explicit operator ForeachData<Typ>(Typ Item) { return new ForeachData<Typ>() { Item = Item }; }

		public static ForeachData<Typ> HasArray(IEnumerable<Typ> Array)
		{
			return new ForeachData<Typ>() { Array = Array };
		}

		public Typ Item { get; set; } = default(Typ);
		public int Index { get; set; } = -1;
		public IEnumerable<Typ> Array { get; set; }

		public ForeachData<Typ> HasItem(Typ Item = default(Typ), int Index = -1)
		{
			if (!Item.Equals(default(Typ)))
			{
				this.Item = Item;
			}
			if (!Index.Equals(-1))
			{
				this.Index = Index;
			}
			return this;
		}

		public ForeachData<Typ> RunFilterAct(FilterList<Typ> filterAct)
		{
			filterAct.Foreach((filterActItem) =>
			{
				filterActItem.Item.run(this);
			});
			return this;
		}

		public override string ToString()
		{
			return Item.ToString();
		}

	}

	public class FilterActCouple<Typ>
	{
		public static Func<Exception, Exception> onException { get; set; }

		#region static init Region
		public static FilterList<Typ> initList()
		{
			return new FilterList<Typ>();
		}

		public static FilterActCouple<Typ> initCouple(Predicate<ForeachData<Typ>> isDo, Action<ForeachData<Typ>> actionToDo)
		{
			return new FilterActCouple<Typ>() { isDo = isDo, actionToDo = actionToDo };
		}

		#endregion

		/// <summary>
		/// Predicate isDo on item Typ
		/// </summary>
		public Predicate<ForeachData<Typ>> isDo { get; set; }

		/// <summary>
		/// Action ToDo on item Typ, if isDo 
		/// </summary>
		public Action<ForeachData<Typ>> actionToDo { get; set; }

		/// <summary>
		/// if this.isDo => this.actionToDo(Item)
		/// </summary>
		/// <param name="Item">Item of Typ in array</param>
		/// <returns>this</returns>
		public FilterActCouple<Typ> run(ForeachData<Typ> Item)
		{
			try
			{
				if (this.isDo != null && this.actionToDo != null)
				{
					var isDo = this.isDo(Item);
					if (isDo)
					{
						this.actionToDo(Item);
					}
				}
			}
			catch (Exception e)
			{
				if (onException != null)
				{
					var ex = onException(e);
					if (ex != null)
					{
						throw ex;
					}
				}
			}
			return this;
		}

	}

	public class FilterList<Typ> : List<FilterActCouple<Typ>>
	{
		internal IEnumerable<Typ> Run(IEnumerable<Typ> arr)
		{
			return arr.ForeachYield((Item) =>
			{
				//Console.WriteLine("in FilterAct, Item: {0};", Item);
				Item.RunFilterAct(this);
			});
		}
	}
}
