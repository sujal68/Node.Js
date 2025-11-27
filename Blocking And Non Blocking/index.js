const fs = require('fs');

console.log('Start');

// Non-blocking (async) file read
const result = fs.readFile('./test.txt', 'utf-8', (err, result) => {
    console.log(result);
});

console.log('end');
