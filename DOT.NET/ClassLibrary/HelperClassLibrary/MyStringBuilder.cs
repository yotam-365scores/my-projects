using System;
using System.Collections.Generic;
using System.Text;

namespace HelperClassLibrary
{
	public class MyStringBuilder
	{
		public StringBuilder sb { get; } = new StringBuilder();

		public MyStringBuilder Append(string text, string DefaultText = null)
		{
			sb.Append(!string.IsNullOrWhiteSpace(text) ?
				text :
				(!string.IsNullOrWhiteSpace(DefaultText) ? DefaultText : null));

			return this;
		}

		// Func<Typ, TProperty> path
		public MyStringBuilder Append<Typ>(Typ obj, string DefaultText = null)
		{
			string text;
			if (obj != null)
			{
				text = obj.ToString();
			}
			else
			{
				text = null;
			}
			this.Append(!string.IsNullOrWhiteSpace(text) ? text : DefaultText, DefaultText);
			return this;
		}

		public override string ToString()
		{
			return sb.ToString();
		}

	}
}
