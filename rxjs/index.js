const { BehaviorSubject } = require("rxjs");

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
  const behaviorSubject = new BehaviorSubject([1]);
  behaviorSubject.subscribe(myLog("first subscribe, arr:"));
  behaviorSubject.next([0, ...behaviorSubject.value]);
  behaviorSubject.subscribe(myLog("second subscribe, arr:"));
  behaviorSubject.next([...behaviorSubject.value, 2]);
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
