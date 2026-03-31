const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());

// FRONTEND FILES SERVE
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth.js"));

// PORT FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

console.log(`Server running on port ${PORT}`);

});