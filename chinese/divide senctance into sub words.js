var fs = require('fs');
var file = __dirname + '/dirty.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
 
  
  for (var i = 0; i < data.length; i++) {
    //change characters to words
    data[i].words = data[i].characters;
    delete data[i].characters;

    //get sub characters
    var words = data[i].words;
    data[i].chars = []

    for (var j = 0; j < words.length; j++) {
      data[i].chars = data[i].chars.concat(words[j].split(""))
    };

    //remove any duplicates
    data[i].chars = uniq(data[i].chars)

    //make sure words are in sub characters
    var result = []
    for (var k = 0; k < data[i].chars.length; k++) {
      var found = false
      for (var p = 0; p < data[i].words.length; p++) {
        if (data[i].words[p] == data[i].chars[k])
          found = true;
      };

      if (!found)
        result.push(data[i].chars[k])

    };

    data[i].chars = result

  };




  fs.writeFile("new.json", JSON.stringify(data, null, 2), function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
  }); 


});


var uniq = function(ary) {
    var prim = {"boolean":{}, "number":{}, "string":{}}, obj = [];

    return ary.filter(function(x) {
        var t = typeof x;
        return (t in prim) ? 
            !prim[t][x] && (prim[t][x] = 1) :
            obj.indexOf(x) < 0 && obj.push(x);
    });
}
