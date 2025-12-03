const fs = require('fs');

// create file in sync
fs.writeFileSync("./Demo.txt", "Hello Demo Text");

// create file in async
fs.writeFile("./DemoAsync.txt", "hello DemoAsync Text", (err) => {
    if (err) {
        console.log("Error Is : ", err);
    }
});

// Append file in sync
fs.appendFileSync("./Demo.txt", "\nTry To Append On This File.");

// Append File In Async
fs.appendFile("./DemoAsync.txt", "\n" + new Date().toLocaleString() + "\n", (err) => {
    if (err) console.log(err);
});

// Read File In Sync
const read = fs.readFileSync("./Demo.txt", "utf-8");
console.log(read);

// Read File In Async
const read2 = fs.readFile("./DemoAsync.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
});
console.log(read2);

// delete File In Sync
fs.unlinkSync("./delete.txt");

// copy file in sync
fs.copyFileSync("./Demo.txt", "./DemoCopy.txt");
