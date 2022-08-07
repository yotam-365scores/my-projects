using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace LearningExamples
{
	public class System_Threading_Channels
	{
        private static readonly Channel<int> myChannel = Channel.CreateUnbounded<int>();

        public static async Task Main()
        {
            Console.WriteLine("in System_Threading_Channels");
            //var first = await myChannel.Reader.ReadAsync();
            //Console.WriteLine(first);

            // will fill the "Queue", 
            for (int i = 0; i < 10; i++)
            {
                await myChannel.Writer.WriteAsync(i);
            }

            int item;
            // wait to get FIFO(first in first out)
            while (myChannel.Reader.TryRead(out item))
			{
                Console.WriteLine(item);
                item = default(int);
            }

            Console.WriteLine("out of System_Threading_Channels");

        }


    }
}
