const fs = require('fs');
const highland = require('highland');
const parse = require('csv-parse');

const stream = highland(fs.createReadStream('newFile.txt', 'utf8'));


let myMap = new Map();

stream
  .split()
  .map(line => line.split(';'))
  .filter(arr => arr[0] === '01')
  .map(entry => ({
    'plz': entry[4],
    'stadt': entry[8]
  }))
  .each(chunk => {
    if (!myMap.has(chunk.plz)) {
      myMap.set(chunk.plz, chunk.stadt);
    }
  }).done(_ => saveMapToFile(myMap));

let ticker = 0;
setTimeout(_ => {
  console.log(`tick #${ticker}!`);
  ticker++;
}, 500);

function saveMapToFile(map) {
  const fileWriter = fs.createWriteStream('ch-cities.json');
  const arr = [];

  myMap.forEach((value, key) => {
    const obj = {
      plz: key,
      stadt: value
    }
    arr.push(obj);
  });

  fileWriter.write(JSON.stringify(arr, null, 4));
}