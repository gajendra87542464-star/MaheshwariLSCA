const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());

// FRONTEND SERVE
app.use(express.static(path.join(__dirname,"../public")));

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"../public/index.html"));
});

app.use("/api/auth", require("./routes/auth.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});