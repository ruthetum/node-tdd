const fs = require('fs');

// 동기
// const data = fs.readFileSync('./data.txt', 'utf8');
// console.log(data);


// 비동기
const data = fs.readFile('./data.txt', 'utf8', function(err, data) {
    console.log(data);
});