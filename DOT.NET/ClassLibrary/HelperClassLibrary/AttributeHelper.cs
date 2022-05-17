using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace HelperClassLibrary
{
	public static class AttributeHelper
	{

		/// <summary>
		/// Call function to get and display the attribute.
		/// <use>
		/// Type t = typeof(ClassWithAttribute);
		/// Type t = ClassWithAttribute.MyProperty.GetType();
		/// var attrInstance = GetAttribute<JsonPropertyAttribute>(t);
		/// var MyPropertyName = GetAttribute<JsonPropertyAttribute>(t).MyPropertyName;
		/// </use>
		/// </summary>
		/// <typeparam name="AttrTyp">Attribute Instance Type</typeparam>
		/// <param name="AttributeHolder">Attribute Holder Type</param>
		/// <returns></returns>
		public static AttrTyp GetAttribute<AttrTyp>(Type AttributeHolder) where AttrTyp : Attribute
		{
			// Get instance of the attribute.
			AttrTyp MyAttribute =
				(AttrTyp)Attribute.GetCustomAttribute(AttributeHolder, typeof(AttrTyp));

			return MyAttribute;
		}

		/// <summary>
		/// ClassWithAttribute obj = new ClassWithAttribute();
		/// var objColums = obj.GetType().GetProperties();
		/// </summary>
		/// <typeparam name="Typ">Attribute type</typeparam>
		/// <param name="propertyInfo">Property that holdes the Attribute</param>
		/// <returns></returns>
		public static Typ GetAttr<Typ>(PropertyInfo propertyInfo) where Typ : Attribute
		{
			return propertyInfo.GetCustomAttribute<Typ>();
		}


	}

	#region DbName Attribute Region

	public class DbNameAttribute : Attribute
	{
		#region Static Region

		public static DbNameAttribute GetDbNameAttr(PropertyInfo propertyInfo)
		{
			return AttributeHelper.GetAttr<DbNameAttribute>(propertyInfo);
		}

		public static bool DbNameContains(PropertyInfo propertyInfo, string name)
		{
			var dbNameAttribute = GetDbNameAttr(propertyInfo);
			if (dbNameAttribute != null)
			{
				return dbNameAttribute.Contains(name);
			}
			else
			{
				return false;
			}

		}
		#endregion

		public List<string> names { get; set; }
		public DbNameAttribute(List<string> names = null) { this.names = names; }
		public DbNameAttribute(string name = null) : this(new List<string> { name }) { }

		public bool Contains(string name)
		{
			return names.Contains(name);
		}

		public string Names
		{
			get { return string.Join(", ", names); }
		}


		public override string ToString()
		{
			return Names;
		}

	}

	// usage example
	class ClassWithAttribute
	{
		//[JsonProperty("myPropertyName")]
		[DbName("MY_PROPERTY_NAME")]
		public int MyPropertyName { get; set; }
	}

	#endregion

}
