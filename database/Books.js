const mongoose = require("mongoose");
 
//create book schema
const BookSchema = mongoose.Schema({
    ISBN : String,
    TITLE : String,
    AUTHOR : [Number],
    LANGUAGE : String,
    PUB_DATE : String,
    NUM_OF_PAGES : Number,
    CATEGORY : [String],
    PUBLICATION : Number,

});

const BookModel = mongoose.model("books", BookSchema );

module.exports = BookModel;