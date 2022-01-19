const mongoose = require("mongoose");

//create author schema
const authorSchema = mongoose.Schema({
    
    ID : Number,
    NAME : String,
    BOOKS : [String],
})

const authorModel = mongoose.model("author", authorSchema );

module.exports = authorModel;