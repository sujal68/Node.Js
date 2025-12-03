const http = require('http');

// Create a basic server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write("<h1>🙂 Welcome Back to My Server 🙂</h1>");

    res.end();
});

// Start the server on port 6800
server.listen(6800, (error) => {
    if (error) {
        console.error("Server failed to start:", error);
        return;
    }
    console.log("🚀 Server is running at http://localhost:6800");
});
