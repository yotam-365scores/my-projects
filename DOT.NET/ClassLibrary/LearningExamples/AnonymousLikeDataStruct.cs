using System;
using System.Collections.Generic;
using System.Text;

namespace LearningExamples
{
    public class AnonymousLikeDataStruct
	{
		public static void test()
		{
            var instence = new AnonymousLikeDataStruct();

            Console.WriteLine("AnonymousLike DataStruct tests: ");

            var t1 = instence.v1();
            Console.WriteLine("v1, Item1: " + t1.Item1 + ", Item2: " + t1.Item2 + ", ToString: " + t1.ToString());
            
            var t2 = instence.v2();
            Console.WriteLine("v2, Item1: " + t2.Item1 + ", Item2: " + t2.Item2 + ", ToString: " + t2.ToString());

            var t3 = instence.v3();
            Console.WriteLine("v3, with intellisense, Flag: " + t3.Flag + ", Id: " + t3.Id + ", ToString: " + t3.ToString());

            var t4 = instence.v4();
            Console.WriteLine("v4, with *no* intellisense, Flag: " + t4.Flag + ", Id: " + t4.Id + ", ToString: " + t4.ToString());

            var t5 = new { Id = "str", Flag = 1 };
            Console.WriteLine("t5, with intellisense, Flag: " + t5.Flag + ", Id: " + t5.Id + ", ToString: " + t5.ToString());


        }

        public Tuple<string, byte> v1()
        {
            return new Tuple<string, byte>("str", 1);
        }

        public (string, int) v2()
        {
            return ("str", 1);
        }

        public (string Id, byte Flag) v3()
        {
            return ("str", 1);
        }

        public dynamic v4()
        {
            return new { Id = "str", Flag = 1 };
        }
    }
}
