
var greet = (greeting = "hello user", name = "") => {
  return greeting + " " + name;
};

var sayHelloTo = _.partial(greet, "hello for you");
sayHelloTo("fred");
// => 'hello for you fred'
