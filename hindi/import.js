
String.prototype.replaceAll = function(str1, str2, ignore) 
{
  if (!str1 || !str2) return this
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

var download = function(url, dest, cb) {
  if (!url) return cb();

  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      cb();
    });
  });
}

var fs = require('fs');
var http = require('http')
var async = require('async')

var resultsFolder = "6. hindi upper beginner"
//make sure to create audio folder! 
var source = 'source.json' //name your starting json from hindi101pod as source.json

var data = JSON.parse( fs.readFileSync("./"+resultsFolder+"/"+source, 'utf8') ).flashcards

//cleanup data
for (var i = 0; i < data.length; i++) {
  data[i].content = JSON.parse(data[i].content)
  if (data[i].content.source) data[i].content.source = data[i].content.source.replaceAll("/", ",")
  if (data[i].content.target) data[i].content.target = data[i].content.target.replaceAll("/", ",")
  if (data[i].content.romanization) data[i].content.romanization = data[i].content.romanization.replaceAll("/", ",")
};

console.log("lets go...", data.length, " words to download.....")

var text = '' +


async.eachLimit(data, 5, function(item, next){
  console.log("working....", item.content.source, item.content.target)

  download(item.content.audio, "./" + resultsFolder + "/audio/"+item.content.target + ".mp3", next)
  text += item.content.source+";"+item.content.target + " - " + item.content.romanization + '\n';
  //next()

}, function(){
   console.log('finished');
   
   fs.writeFileSync("./"+resultsFolder+"/text.csv",text)

})

