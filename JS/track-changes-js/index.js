console.log('start TrackChanges');

/***** track-changes-js */


function testTrackChanges() {
    var TrackChanges = require('track-changes-js');
    //import TrackChanges from "track-changes-js";

    const runMin = () => {
      const trackChanges = new TrackChanges();
    
      // tracked variable
      let num = 1;
    
      // add an observer, pass the name and function that returns the variable
      trackChanges.addObserver("numObserv", () => num);
    
      // add a handler, pass the name and function that will be called when changing "num"
      trackChanges.addHandler("numObserv", numHandler);
    
      num++;
      /** 
        create a function that will be called when the variable changes, the function argument will be its changed value 
        **/
      function numHandler(modifiedResult) {
        console.log(`Num changed to: ${modifiedResult}`);
      }
    };
    
    const run = () => {
      const trackChanges = new TrackChanges();
    
      // Track variable changed
      let variable = 1;
      trackChanges.addObserver("variable", () => variable);
      trackChanges.addHandler("variable", variableHandler);
    
      function variableHandler(modifiedResult) {
        console.log(`Variable changed to: ${modifiedResult}`);
        variable = 1;
      }
    
      setTimeout(() => {
        variable = 0;
      }, 3000);
    
      // Track object key changed
      let object = { user: "root" };
      trackChanges.addObserver("object", () => object.user);
      trackChanges.addHandler("object", objectHandler);
    
      function objectHandler(modifiedResult) {
        console.log(`Object key changed to: ${modifiedResult}`);
      }
    
      setTimeout(() => {
        object.user = "alex";
      }, 4000);
    
      // GET OBSERVER STRUCT BY NAME
      setTimeout(() => {
        console.log(
          'Get "variable" observer struct by name',
          trackChanges.getObserverStruct("variable")
        );
      }, 7000);
    
      // GET OBSERVER STRUCT BY NAME
      setTimeout(() => {
        console.log("All observers struct", trackChanges.getAllObserversStruct());
      }, 8000);
    
      // DELETE ALL HANDLERS
      setTimeout(() => {
        trackChanges.removeHandler("variable", variableHandler);
        trackChanges.removeHandler("object", objectHandler);
        console.log("All handlers remove");
      }, 15000);
    
      // DELETE ALL OBSERVERS
      setTimeout(() => {
        trackChanges.removeObserver("variable");
        trackChanges.removeObserver("object");
        console.log("All observers remove");
      }, 15000);
    };
    
    //run();
    runMin();
        
}
//testTrackChanges();


/***** deep-diff */

function testDeepDiff() {
    var {diff} = require('deep-diff');
    //import { DeepDiff } from 'deep-diff';

    /* 
    Differences are reported as one or more change records. Change records have the following structure:

kind - indicates the kind of change; will be one of the following:
N - indicates a newly added property/element
D - indicates a property/element was deleted
E - indicates a property/element was edited
A - indicates a change occurred within an array
path - the property path (from the left-hand-side root)
lhs - the value on the left-hand-side of the comparison (undefined if kind === 'N')
rhs - the value on the right-hand-side of the comparison (undefined if kind === 'D')
index - when kind === 'A', indicates the array index where the change occurred
item - when kind === 'A', contains a nested change record indicating the change that occurred at the array index
 */
    
    var lhs = {
        name: 'my object',
        description: 'it\'s an object!',
        details: {
          it: 'has',
          an: 'array',
          with: ['a', 'few', 'elements']
        }
      };
       
      var rhs = {
        name: 'updated object',
        description: 'it\'s an object!',
        details: {
          it: 'has',
          an: 'array',
          with: ['a', 'few', 'more', 'elements', { than: 'before' }]
        }
      };
       
      var differences = diff(lhs, rhs);
      console.log('differences', differences);
      
}
testDeepDiff();

console.log('end TrackChanges');