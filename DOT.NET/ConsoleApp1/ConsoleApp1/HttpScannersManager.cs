using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

using HtmlAgilityPack;
using System.Dynamic;

namespace ConsoleApp1.Tests
{
	public class HttpScannersManager
	{
		public static void Run()
		{
			Task.Run(async () =>
			{
				HttpScannersManager sm = new HttpScannersManager();
				await sm.GetScenners();
			}).Wait();
		}

		public string BaseAddress { get; private set; } = "http://site.com/";

		//readonly private ApplicationDbContext _db = new ApplicationDbContext();
		public async Task<IEnumerable<dynamic>> GetScenners()
		{
			//throw new NotImplementedException();

			try
			{
				string ConfigUrl = BaseAddress + "some.aspx?Code=3";
				var initialContent = await getHttpClient(ConfigUrl);
				return await ParseHtml(initialContent);
			}
			catch (Exception ex)
			{
				return null;
			}

		}

		public async Task<string> getHttpClient(string ConfigUrl)
		{
			string initialContent;
			using (var cl = new HttpClient())
			{
				var httpResponse = await cl.GetAsync(ConfigUrl);

				var IsSuccessStatusCode = httpResponse.IsSuccessStatusCode;

				initialContent = await httpResponse.Content.ReadAsStringAsync();
			}

			return initialContent;

		}

		public async Task<IEnumerable<dynamic>> ParseHtml(string initialContent)
		{
			var htmlDoc = new HtmlDocument();

			htmlDoc.LoadHtml(initialContent);

			var body = htmlDoc.DocumentNode.SelectSingleNode("/html/body");
			List<dynamic> returnRes = new List<dynamic>();

			// mainTable is build by rows (tr)
			var mainTable = getInside(body, new int[] { 3, 7, 0, 6 });
			var rows = mainTable.ChildNodes.Where(tr => tr.Name == "tr");

			// each row has meny (3) tabels
			foreach (var tr in rows)
			{
				var tablesRow = tr.ChildNodes
					// choose only (3) table items.
					.Where(x => x.Name == "td")
					// fucus on the table inside.
					.Select(x => x.ChildNodes.Where(t => t.Name == "table").FirstOrDefault());

				foreach (var singleTable in tablesRow)
				{
					//var someTable = getInside(tr, new int[] { 0 });
					var singleTableProps = singleTable.ChildNodes
						// choose inner text
						.Select(x => x.InnerText)

						// not empty
						.Where(x => !String.IsNullOrWhiteSpace(x));

					// every table is an object
					dynamic exo = new ExpandoObject();

					// each 
					foreach (var propStr in singleTableProps)
					{

						var arr = propStr.Split(":");

						if (arr != null && arr.Length > 0)
						{

							// index 0 for prop Name
							var propName = arr[0];

							// rest (1) is for prop Value
							if (arr[1] != null)
							{
								arr[1].TrimStart(' ');
							}

							//var propVal = arr[1]; // in this case we miss the times where ':' is in the value in addition to as a separator.
							var propVal = string.Join(":", arr.Where((str, index) => index != 0));

							((IDictionary<String, Object>)exo).Add(propName, propVal);
						}
					}

					returnRes.Add(exo);
				}

			}

			var t = getInside(mainTable, new int[] { 0 });

			return new List<dynamic>() { };

		}

		public HtmlNode getInside(HtmlNode node, IEnumerable<int> depts)
		{
			foreach (var index in depts)
			{
				HtmlNodeCollection ChildNodes = node.ChildNodes;
				node = ChildNodes[index];
			}

			return node;
		}


	}
}
