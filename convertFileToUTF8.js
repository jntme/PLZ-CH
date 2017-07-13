var fs = require('fs');

// ./Post_Adressdaten20170711.csv
// file.txt
var readableStream = fs.createReadStream('./Post_Adressdaten20170711.csv', 'latin1');
var writableStream = fs.createWriteStream('./newFile.txt');

readableStream.on('data', function (chunk) {
  console.log(chunk);
  writableStream.write(chunk);
});
