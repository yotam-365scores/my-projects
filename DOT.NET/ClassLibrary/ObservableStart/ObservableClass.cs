using System;
using System.Reactive.Linq;
using System.Threading;

namespace ObservableStart
{
	public class ObservableClass
    {
        public static void StartBackgroundWork()
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
    public class ObservableCreateClass
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

    }


}
