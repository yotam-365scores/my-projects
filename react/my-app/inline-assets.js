/* 
var fs = require("fs")
var inlineAssets = require("inline-assets")
var content = fs.readFileSync("<source-file>", "utf8")
content = inlineAssets("<destination-file>", "<source-file>", content, {
    verbose: false,
    htmlmin: false,
    cssmin:  false,
    jsmin:   false,
    pattern: [ ".+" ],
    purge:   false
})
fs.writeFileSync("<destination-file>", content, "utf8")
 */

var fs = require("fs")
var inlineAssets = require("inline-assets")

// todo: 
const sourceFile = './standAlone.html', 
    destinationFile = './standAlone1.html';

var content = fs.readFileSync(sourceFile, "utf8");
console.log('content: ', content);
const content1 = inlineAssets('undefined', "utf8", content, {
    verbose: false,
    htmlmin: false,
    cssmin:  false,
    jsmin:   false,
    pattern: [ ".+" ],
    purge:   false
});
console.log('inlineAssets content: ', content1);
fs.writeFileSync(destinationFile, content1, "utf8")
