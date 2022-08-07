const sass = require('sass');

const result = sass.compile('index.sass').css;
console.log('result', result);