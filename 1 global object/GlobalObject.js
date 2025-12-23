console.log(__filename);
console.log(__dirname);

// setTimeout
setTimeout(() => {
    console.log("sujal");
}, 5000);

// setInterval
let totalSecond = 120;

let timer = setInterval(() => {

    if (totalSecond == 0) {
        return;
    }

    let minutes = Math.floor(totalSecond / 60);
    let seconds = totalSecond % 60;

    console.log(`${minutes}:${seconds}`);

    totalSecond--;
    
}, 1000);