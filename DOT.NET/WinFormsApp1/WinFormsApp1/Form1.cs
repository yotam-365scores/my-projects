using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WinFormsApp1
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
			Print(new MyClass());
		}

		public DialogResult Print<Typ>(Typ Obj)
		{
			string str = new { Obj }.ToString();
			return MessageBox.Show(str);
		}



		public void ClipboardTest()
		{
			string text;
			string[] a;

			if (Clipboard.ContainsText())
			{
				text = Clipboard.GetText(TextDataFormat.Text);
				MessageBox.Show("text before: " + text);

				//  the following could have been done simpler with
				//  a Regex, but the regular expression would be not
				//  exactly simple

				if (text.Length > 1)
				{
					//  unify all line breaks to \r
					text = text.Replace("\r\n", "\r").Replace("\n", "\r");

					//  create an array of lines
					a = text.Split('\r');

					//  join all trimmed lines with a space as separator
					text = "";

					//  can't use string.Join() with a Trim() of all fragments
					foreach (string t in a)
					{
						if (text.Length > 0)
							text += " ";
						text += t.Trim();
					}

					MessageBox.Show("text after: " + text);

					Clipboard.SetDataObject(text, true);
				}
			}


		}

	}


	//[AttributeUsage(AttributeTargets.Method)]
	[AttributeUsage(AttributeTargets.Class)]
	public class MyAttribute : Attribute
	{
		static MyAttribute()
		{
			System.Type thisType = typeof(MyAttribute);

			System.Attribute[] attributes = new System.Attribute[] {
				new AttributeUsageAttribute(AttributeTargets.Method)
			};

			TypeDescriptor.AddAttributes(thisType, attributes);
		}

		public MyAttribute()
		{
			//new AttributeUsageAttribute(AttributeTargets.Method);
		}
	}

	[My]
	class MyClass
	{
		// add attributes programmatically
		static MyClass()
		{
			System.Type thisType = typeof(MyClass);

			System.Attribute[] attributes = new System.Attribute[] {
				new MyAttribute()
			};

			TypeDescriptor.AddAttributes(thisType, attributes);
		}
	}
}
