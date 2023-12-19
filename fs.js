const fs = require('fs');

fs.writeFileSync('fs.txt', 'this is test data.');
const text = fs.readFileSync('fs.txt', 'utf-8');
console.log(text);
fs.appendFileSync('fs.txt', ' this is append data.');
const text2 = fs.readFileSync('fs.txt', 'utf-8');
console.log(text2);
fs.appendFile('fs.txt', ' this is second append data.', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile('fs.txt', 'utf-8', (err, text3) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(text3);
  });
});