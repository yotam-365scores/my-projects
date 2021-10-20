using System;
using System.Collections.Generic;
using System.Text;

namespace HelperClassLibrary
{
	public static class ConverterHelper
	{
		public static byte[] GetBytes(string str)
		{
			return Encoding.ASCII.GetBytes(str);
		}
		public static string FromBytes(byte[] bytes)
		{
			return Encoding.ASCII.GetString(bytes);
		}


	}
}
