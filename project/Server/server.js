const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const msg = `New User ${new Date()} IP Address: ${req.socket.remoteAddress}\n`;

    if (req.url === "/favicon.ico") {
        res.end();
        return;
    }

    fs.appendFile("./log.txt", msg, (err) => {
        if (err) {
            console.log("File Write Error:", err);
        }
        console.log(req.url);
    });

    let filename = "";
    switch (req.url) {
        case "/":
            filename = "home.html"
            break;
        case "/about":
            filename = "about.html"
            break;
        case "/blog":
            filename = "blog.html"
            break;
        case "/contect":
            filename = "contect.html"
            break;
        default:
            filename = "404.html"
            break;
    }

    fs.readFile(filename, (err, result) => {
        res.end(result);
    })
});

server.listen(8000, (err) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Server Started Successfully on PORT 8000 (http://localhost:8000)");
    }
});