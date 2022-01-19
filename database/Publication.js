const mongoose = require("mongoose");

//create publication schema
const publicationSchema = mongoose.Schema({

    ID : Number,
    NAME : String,
    BOOKS : [String],
})

const publicationModel = mongoose.model("publication", publicationSchema );

module.exports = publicationModel;