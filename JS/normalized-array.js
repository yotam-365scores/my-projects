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
