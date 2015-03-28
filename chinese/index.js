var fs = require('fs');
var file = __dirname + '/dirty.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
 
  
  var deadcount = 0

  for (var i = 0; i < data.length; i++) {



    var unit = data[i]

    var chinese = unit.chineseText.split("。")
    var english = unit.englishText.split("Mr.").join("Mr*").split(".");
    

    //if (unit.title != "Mr. Wang Works at the University") continue
    
    /*
    if (chinese.length == english.length){
      console.log("sentance match!", chinese.length, english.length)
      unit.sentances = {}
      unit.sentances.english = english
      unit.sentances.chinese = chinese

    }
    */
    


      var chinese = trim(unit.chineseText, "\n").split("\n")
      var english = trim(unit.englishText, "\n").split("\n");

      if (chinese.length == english.length){
        console.log("PARA match!", chinese.length, english.length)
        unit.paragraphs = {}
        unit.paragraphs.english = english
        unit.paragraphs.chinese = chinese


      }else{
        console.log(":::((( no match!", chinese.length, english.length, unit.title)
          deadcount++
      }

      //break
    


    //break
    //

  };

  console.log("Dead", deadcount)


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

var trim = (function () {
    "use strict";

    function escapeRegex(string) {
        return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
    }

    return function trim(str, characters, flags) {
        flags = flags || "g";
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }

        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }

        characters = escapeRegex(characters);

        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    };
}());
