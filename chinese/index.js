var fs = require('fs');
var file = __dirname + '/dirty.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);

  for (var i = 0; i < data.length; i++) {
    var text = ''
    var vocab = data[i].vocab
    for (var j = 0; j < vocab.length; j++) {
      text += vocab[j].simplified + "," + vocab[j].definitions + "\n"
    };

    fs.writeFile("./csv/"+pad(i, 4)+". " + data[i].title+".csv", text, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 

    fs.writeFile("./summary/chinese/"+pad(i, 4)+". " + data[i].title+".txt", data[i].chineseText, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 

    fs.writeFile("./summary/english/"+pad(i, 4)+". " + data[i].title+".txt", data[i].summary + "\n\n ----------- \n\n" + data[i].englishText, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

  };
 






});


function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

var uniq = function(ary) {
    var prim = {"boolean":{}, "number":{}, "string":{}}, obj = [];

    return ary.filter(function(x) {
        var t = typeof x;
        return (t in prim) ? 
            !prim[t][x] && (prim[t][x] = 1) :
            obj.indexOf(x) < 0 && obj.push(x);
    });
}
