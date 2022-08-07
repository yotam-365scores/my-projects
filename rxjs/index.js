const {
  BehaviorSubject,
  generate,
  defer,
  interval,
  range,
  iif,
  of,
  timer,
  combineLatest,
  pipe,
  filter,
  map,
  Observable,
  tap,
  defaultIfEmpty,
  materialize,
} = require("rxjs");

function myLog(text = "") {
  // number of changes this subscriber has pass.
  var i = 0;
  return (val) => {
    console.log(i + ". " + text, val);
    i++;
  };
}

async function run1() {
  // init val
  const behaviorSubject = new BehaviorSubject("1`st change, init");

  // in BehaviorSubject subscribe will get trigger init val, in Subject the first subscribe will not trigger here.
  behaviorSubject.subscribe(myLog("first subscribe, string:"));

  behaviorSubject.next("2`nd change, next");
  behaviorSubject.subscribe(myLog("second subscribe, string:"));
  behaviorSubject.next("3`ed change, next");
}

async function run() {
  function behaviorSubject_test() {
    const behaviorSubject = new BehaviorSubject([1]);
    behaviorSubject.subscribe(myLog("first subscribe, arr:"));
    behaviorSubject.next([0, ...behaviorSubject.value]);
    behaviorSubject.subscribe(myLog("second subscribe, arr:"));
    behaviorSubject.next([...behaviorSubject.value, 2]);
  }

  function generate_test() {
    const result = generate(
      0,
      (x) => x < 3,
      (x) => x + 1,
      (x) => x
    );

    result.subscribe((x) => console.log(x));
  }

  async function defer_test() {
    const clicksOrInterval = defer(() => {
      return interval(1000);
    });

    await clicksOrInterval.subscribe((x) => console.log(x));
  }

  function range_test() {
    const numbers = range(1, 3);

    numbers.subscribe({
      next: (value) => console.log("number-" + value),
      complete: () => console.log("Complete!"),
    });
  }

  function iif_test() {
    let subscribeToFirst;
    const firstOrSecond = iif(
      () => subscribeToFirst,
      of("first"),
      of("second")
    );

    subscribeToFirst = true;
    // will trigger on subscribe
    firstOrSecond.subscribe((value) => console.log(value));

    subscribeToFirst = false;
    // will trigger on subscribe
    firstOrSecond.subscribe((value) => console.log(value));

    // will Not trigger on change
    subscribeToFirst = true;
  }

  function combineLatest_test() {
    const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    const secondTimer = timer(500, 2000); // emit 0, 1, 2... after every 2 second, starting 0,5s from now
    const combinedTimers = combineLatest([firstTimer, secondTimer]);
    //combinedTimers.subscribe((value) => console.log(value));
    combinedTimers.subscribe(([firstTimer, secondTimer]) =>
      console.log("Timer: ", { firstTimer, secondTimer })
    );
  }

  function customPipe_test() {
    function discardOddDoubleEven() {
      return pipe(
        filter((v) => !(v % 2)),
        map((v) => v + v)
      );
    }

    var newobserver = range(0, 10).pipe(discardOddDoubleEven());

    newobserver.subscribe(myLog("discardOddDoubleEven, num:"));
  }

  function customOperator_test() {
    // https://rxjs.dev/guide/operators
    // operator Creator factory
    function operatorCreator(moduleNum = 2) {
      // Creator factory will return Observable to Observable func.
      return (observ = Observable.prototype) => {
        // get Observable and return Observable.
        //return new Observable(subscrib => { });
        return observ.pipe(filter((v) => !(v % moduleNum)));
      };
    }

    var newobserver = range(0, 10).pipe(operatorCreator());

    newobserver.subscribe(myLog("discardOdd, num:"));
  }

  function tap_test() {
    var newobserver = range(0, 10).pipe(
      tap((num) => {
        // the tap pipe will let you get the data on the way, but not to change it.
        console.log("num", num);
        return 7;
      })
    );

    newobserver.subscribe(myLog("after tap, num:"));
  }

  function defaultIfEmpty_test() {
    var newobserver = range(0, 10).pipe(
      map((num) => {
        return num % 2 == 0 ? num : undefined;
      })
    );

    newobserver
      .pipe(valueOrDefaultString("not even"))
      .subscribe(myLog("defaultIfEmpty, num:"));
  }

  function materialized_test() {
    const letters = of('a', 'b', 13, 'd');
    const upperCase = letters.pipe(map(x => x.toUpperCase()));
    const materialized = upperCase.pipe(materialize());
 
    materialized
      .subscribe(myLog("materialize, letter:"));

  }

  //behaviorSubject_test();

  //generate_test();

  //defer_test();

  //range_test();

  //iif_test();

  //combineLatest_test();

  //customPipe_test();

  //customOperator_test();

  //tap_test();

  //defaultIfEmpty_test();

  materialized_test();




}

function valueOrDefault(defaultValue = undefined) {
  return pipe(
    map((v) => v != null && v != undefined ? v: defaultValue)
  );
}

function valueOrDefaultString(defaultValue = '') {
  return pipe(
    map((v) => v != null && v != undefined && v !== '' ? v: defaultValue)
  );
}


run()
  .catch((error) => console.error("catch", error))
  .then(() => console.log("then"))
  .finally(() => console.log("finally"));

function myState(initState = undefined) {
  /* 
	const [get, set] = myState(5);
  console.log("get", get());
	set(6)
  console.log("get", get());
 */
  var i = initState;
  return [
    // get
    () => {
      return i;
    },
    // set
    (val) => {
      i = val;
    },
  ];
}

function myGetSet(initValue = undefined) {
  /* 
    const getset = myGetSet('initValue');
    // (send undefined & not set) & get
    getset()
    // (send not undefined & set) & get
    getset('some val not undefined')
    // set undefined & get
    getset(undefined, true)
 */
  var _data = initValue;
  return (data = undefined, setUndefined = false) => {
    if (data || setUndefined) {
      _data = data;
    }
    return _data;
  };
}
