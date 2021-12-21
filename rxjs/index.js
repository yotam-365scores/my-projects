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

async function run2() {
  const behaviorSubject = new BehaviorSubject([1]);
  behaviorSubject.subscribe(myLog("first subscribe, arr:"));
  behaviorSubject.next([0, ...behaviorSubject.value]);
  behaviorSubject.subscribe(myLog("second subscribe, arr:"));
  behaviorSubject.next([...behaviorSubject.value, 2]);
}

async function run() {
  // out of 100
  var container1 = {
    option1: 30,
    option2: 30,
    option3: 40,
  };

  // out of 100
  var container2 = {
    option1: 40,
    option2: 60,
  };

  // for normalized array.
  // out of 100 * array.length (assume normalized)
  // todo: to normalized, in single for statment, need to add rxjs.
  function calc(array = [container1]) {
    const reduceNormalized = (previousValue = container1, currentValue = container1, currentValueIndex = 0) => {
      console.log("reduce", { currentValue, previousValue, currentValueIndex });

      const forEachKeyInCurrentValue = (key, keyIndex) => {
        const element = currentValue[key];
        console.log("for", { key, currentValue, element, keyIndex });
        if (previousValue[key]) {
          previousValue[key] += element;
        } else {
          previousValue[key] = element;
        }

      };

      Object.keys(currentValue).forEach(forEachKeyInCurrentValue);

      return previousValue;
    }

    var target = array.reduce(reduceNormalized, {});

    console.log("", { arr: array, target, outOf: 100 * array.length });
  }

  calc([container1, container2]);
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
