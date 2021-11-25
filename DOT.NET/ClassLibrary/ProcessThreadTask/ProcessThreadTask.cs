using System;

// Process.Start("index.txt");
using System.Diagnostics;

//new Thread(() => { Console.WriteLine("in Thread"); }).Start();
using System.Threading;

// Task.Run(() => { Console.WriteLine("in Task"); }).Wait();
using System.Threading.Tasks;

namespace ProcessThreadTask
{
	public static class ProcessThreadTaskTest
	{
		public static void Run()
		{
			MyProcess();

			MyThread();

			MyTask();

		}

		public static void MyProcess()
		{
			// say 'Hello World' And 'Press any key to continue'
			Process p = Process.Start(@"C:\Users\yotam\source\repos\ConsoleApp1\ConsoleApp1\dist\ConsoleApp1.exe");
		}

		public static void MyThread()
		{
			Thread t = new Thread(() =>
			{
				//Thread.Sleep(5000);
				Console.WriteLine("in Thread");
			});
			t.IsBackground = true;
			t.Start();
		}

		public static void MyTask()
		{
			Task.Run(() =>
			{
				Console.WriteLine("in simple Task");
			});

			Task t = Task.Run(async () =>
			{
				Thread.Sleep(500);
				await AsyncFunc();
				Console.WriteLine("in asyncTask");
			});

			//t.Wait();

			Task.Run(AsyncFunc).Wait();
		}

		public static async Task AsyncFunc()
		{
			//Thread.Sleep(500);
			await Task.Run(() => { Console.WriteLine("in AsyncFunc"); });
		}

	}
}
