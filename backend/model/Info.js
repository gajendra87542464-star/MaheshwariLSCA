const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({

Fullname: String,

email: {
type: String,
unique: true
},

mobile: {
    type : Number,
    unique : true,
},
address : String,

});

module.exports = mongoose.model("Info", infoSchema);