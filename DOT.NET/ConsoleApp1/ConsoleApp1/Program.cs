using System;

using LearningExamples;

using ProcessThreadTask;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World! Main");

            // tests of Process, Thread, Task
            //ProcessThreadTaskTest.Run();

            // Display powers of 2 up to the exponent of 3:
            YieldExample.Run();
            
            //Console.WriteLine("long.MaxValue, "+ long.MaxValue);

            Exit();

        }


        static void Exit()
		{
            Console.WriteLine("Press any key to continue Main");
            Console.ReadKey(false);
            Console.WriteLine("ReadKey");
        }


    }
}
