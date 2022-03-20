var tbody = $("body > div.main > table > tbody");
var c = tbody.children;
var arr;
const objMain = {};
var title;
for (let index = 1; index < c.length; index++) {
  const element = c[index];
  if (element && element.children) {
    // title row
    if (element.children[0].classList[0] == "mediumhead") {
        if (title) {
            objMain[title] = arr;
        }
        title = element.children[0].innerText;
        arr = [];
    } 
    
    // item or legend row
    else if (element.children[0].classList[0] == "rchars") {
        // item
        if (element.children[1].innerText != "Code") {
      //var icon = c[3].children[2].innerText;
      var utf8Code = element.children[1].innerText;
      var utfChar = element.children[2].innerText;
      var CLDRShortName;
      if (element.children[14]) {
        CLDRShortName = element.children[14].innerText;
      } else {
        CLDRShortName = element.children[4].innerText;
      }
      arr.push({ utf8Code, utfChar, CLDRShortName });
        }
    }
    //prompt(title, JSON.stringify(arr));
  }
}
console.log('objMain', objMain);

