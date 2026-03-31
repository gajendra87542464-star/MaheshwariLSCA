const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth.js"));

app.listen(5000, ()=>{

console.log("Server running on port 5000");

});