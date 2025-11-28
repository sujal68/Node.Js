const https = require('http')

const server = https.createServer((req, res) => {
    res.write("<h1 style='color:#fff; background:#000; padding:25px; text-align:center; margin:0;'>:) Welcome Back My Server :-)</h1>");
    res.end();
});

server.listen(6800, (error) => {
    if (error) {
        console.log("Server Is Note Found.", error);
    }
    console.log("Server Starting Now localhost:6800 Is Runnig.😄😄😄");

});