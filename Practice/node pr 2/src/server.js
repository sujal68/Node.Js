require("dotenv").config();
require("./src/config/db.config");

const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/admin", require("./src/routes/admin.routes"));
app.use("/api/manager", require("./src/routes/manager.routes"));

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error starting server: ${err}`);
        return;
    }
    console.log(`Server Running on Port ${PORT} 🚀`);
});