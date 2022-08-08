using System;
using System.Collections.Generic;
using System.Reactive.Concurrency;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using System.Threading;

namespace ObservableStart
{
	public class ObservableTests
	{
		public static void Tests()
		{
			Console.WriteLine("Start Background Work");
			StartBackgroundWork();

			Console.WriteLine("Start Generic IEnumerable");
			GenericIEnumerable();

			Console.WriteLine("Start Observable Create");
			ObservableCreateTests.LongRunningOperationAsync();

			Console.WriteLine("Start Observable Disposable Scheduler");
			ObservableDisposableScheduler.DisposableScheduler();

			Console.WriteLine("Start Observable Interval");
			ObservableInterval();

		}


		private static void StartBackgroundWork()
		{
			Console.WriteLine("Shows use of Start to start on a background thread:");
			var o = Observable
				.Start(() =>
			{
				//This starts on a background thread.
				Console.WriteLine("From background thread. Does not block main thread.");
				Console.WriteLine("Calculating...");
				Thread.Sleep(3000);
				Console.WriteLine("Background work completed.");
			})
				.Finally(() => Console.WriteLine("Main thread completed."));
			Console.WriteLine("\r\n\t In Main Thread...\r\n");
			// Wait for completion of background operation.
			o.Wait();
			Console.WriteLine("Wait completed");
		}

		private static void GenericIEnumerable()
		{
			IEnumerable<int> someInts = new List<int> { 1, 2, 3, 4, 5 };

			// To convert a generic IEnumerable into an IObservable, use the ToObservable extension method.
			IObservable<int> observable = someInts.ToObservable();

			observable.Subscribe(i => Console.WriteLine(i));

		}

		private static void ObservableInterval()
		{
			IObservable<long> oneNumberPerSecond = Observable
				.Interval(TimeSpan.FromSeconds(10));

			oneNumberPerSecond.Subscribe(i => Console.WriteLine(i));
		}

	}


	public class TypClass
	{
		private int myVar;
		public int MyProperty
		{
			get { return myVar; }
			set { myVar = value; }
		}

	}
	public class ObservableCreateTests
	{

		// Synchronous operation
		private static TypClass DoLongRunningOperation(int param)
		{
			Console.WriteLine("some Long Running Operation:");
			return new TypClass() { MyProperty = param };
		}

		public static IObservable<TypClass> LongRunningOperationAsync()
		{
			return Observable.Create<TypClass>(
				o => Observable
				.ToAsync<int, TypClass>(DoLongRunningOperation)(7)
				.Subscribe(o)
			);
		}

		private static IObservable<IList<string>> CombineLatestGet()
		{
			return Observable.CombineLatest(
				Observable.Start(() => { Console.WriteLine("Executing 1st on Thread: {0}", Thread.CurrentThread.ManagedThreadId); return "Result A"; }),
				Observable.Start(() => { Console.WriteLine("Executing 2nd on Thread: {0}", Thread.CurrentThread.ManagedThreadId); return "Result B"; }),
				Observable.Start(() => { Console.WriteLine("Executing 3rd on Thread: {0}", Thread.CurrentThread.ManagedThreadId); return "Result C"; })
			)
				.Finally(() => Console.WriteLine("Done!"));
		}

		public async void ParallelExecutionTest()
		{
			IObservable<IList<string>> Combined = CombineLatestGet();

			foreach (string r in await Combined.FirstAsync())
				Console.WriteLine(r);
		}

	}


	public class ObservableDisposableScheduler
	{
		public static async void DisposableScheduler()
		{
			IObservable<int> ob = Observable.Create<int>(CreateMethod());

			IDisposable subscription = ob.Subscribe(i => Console.WriteLine(i));
			Console.WriteLine("Press any key to cancel");
			Console.ReadKey();
			subscription.Dispose();
			Console.WriteLine("Press any key to quit");
			Console.ReadKey();  // give background thread chance to write the cancel acknowledge message

		}

		private static Func<IObserver<int>, IDisposable> CreateMethod()
		{
			return o =>
			{
				var cancel = new CancellationDisposable(); // internally creates a new CancellationTokenSource
				NewThreadScheduler.Default.Schedule(ScheduleMethod(o, cancel));

				return cancel;
			};
		}

		private static Action ScheduleMethod(IObserver<int> o, CancellationDisposable cancel)
		{
			return () =>
			{
				int i = 0;
				for (; ; )
				{
					Thread.Sleep(200);  // here we do the long lasting background operation
					if (!cancel.Token.IsCancellationRequested)    // check cancel token periodically
						o.OnNext(i++);
					else
					{
						Console.WriteLine("Aborting because cancel event was signaled!");
						o.OnCompleted();
						return;
					}
				}
			};
		}


	}


	public class ObserveEvent_Simple
	{
		public static event EventHandler<TypClass> SimpleEvent;

		static void Main()
		{
			// To consume SimpleEvent as an IObservable:
			var eventAsObservable = Observable.FromEventPattern<TypClass>(
				ev => SimpleEvent += ev,
				ev => SimpleEvent -= ev);

			var s = eventAsObservable
				.Subscribe(EventHandlerArgs => 
					Console.WriteLine("Received event for s subscriber - " + EventHandlerArgs.EventArgs.MyProperty));

			// will trigger Simple Event and eventAsObservable
			SimpleEvent(null, new TypClass());
		}
	}
}
