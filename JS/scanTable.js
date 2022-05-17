// html table to array
var table = $('#main > div.w3-responsive > table > tbody');

var arr = [];

for (let index = 0; index < table.children.length; index++) {
    const row = table.children[index];
    
    var Char = row.children[0].innerText;
var Dec = row.children[1].innerText;
var Hex = row.children[2].innerText;
var Entity = row.children[3].innerText;
var Name = row.children[4].innerText;

arr.push({
    char: Char, dec: Dec, hex: Hex, entity: Entity, itemName: Name
});
}

