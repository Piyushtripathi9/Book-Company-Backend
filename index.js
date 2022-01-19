// MAIN BACKEND FILE

require('dotenv').config()
const db = require ("./database/index") ;
const BookModel = require("./database/Books");
const authorModel = require("./database/Author");
const publicationModel = require("./database/Publication");


const express = require("express");
const app = express();
app.use(express.json());

//import the mongoose module
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB__URI;
mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("connection estabilished"))



// http://localhost:3000
app.get("/",(req,res)=>{

    return res.json({"welcome":`to my backend software for the book company}`});
})

/* 
    Route          /books
    description    get all the books
    Access         Public
    Parameter      None
    Method         get
*/
//http://localhost:3000/books
app.get("/books", async (req,res)=>{
    getallbooks = await BookModel.find();
    return res.json(getallbooks);
})
/* 
    Route          /book-isbn
    description    get specific book on isbn
    Access         Public
    Parameter      isbn
    Method         get
*/
//http://localhost:3000/book-isbn/123three
app.get("/book-isbn/:isbn",async (req,res)=>{
    const {isbn} = req.params;
    const getSpecificBook = await BookModel.findOne({ISBN : isbn});
    if(getSpecificBook===null){
        return res.json({"error":`No Book found for the isbn of ${isbn}`});
    }
    return res.json(getSpecificBook);
} );
/* 
    Route          /book-category
    description    get specfic book on category
    Access         Public
    Parameter      category
    Method         get
*/
//http://localhost:3000/book-category/PROGRAMING
app.get("/book-category/:category",async (req,res)=>{
    const {category} = req.params;
        
    const getSpecificBooks = await BookModel.find({CATEGORY:category});

    if(getSpecificBooks.length===0){
        return res.json({"error":`No Book found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
} );
/* 
    Route          /authors
    description    get all the authors
    Access         Public
    Parameter      None
    Method         get
*/
//http://localhost:3000/authors
app.get("/authors", async (req,res)=>{
    getallauthors = await authorModel.find();
    return res.json(getallauthors);
})

/* 
    Route          /authors
    description    get specific authors with id
    Access         Public
    Parameter      id
    Method         get
*/
//http://localhost:3000/authors/1
app.get("/authors/:id", async (req,res)=>{
    let {id} = req.params;
    id = Number(id);
    const getspecificauthor = await authorModel.find({ID:id});
    if(getspecificauthor.length===0){
        return res.json({"error":`No author found for the id of ${id}`});
    }
    return res.json(getspecificauthor[0]);
} );
/* 
    Route          /authors-book
    description    get specific authors with isbn
    Access         Public
    Parameter      isbn
    Method         get
*/
//http://localhost:3000/authors-book/123three
app.get("/authors-book/:isbn", async (req,res)=>{
    console.log(req.params);
    const {isbn} = req.params;
    console.log(isbn);
    const getspecificauthor = await authorModel.find({BOOKS : isbn});
    console.log(getspecificauthor);
    if(getspecificauthor.length===0){
        return res.json({"error":`No author found for the isbn of ${isbn}`});
    }
    return res.json(getspecificauthor[0]);
} );
/* 
    Route          /publications
    description    get all publications
    Access         Public
    Parameter      None
    Method         get
*/
// http://localhost:3000/publications
app.get("/publications", async (req,res)=>{
    getallpublication = await publicationModel.find();
    return res.json(getallpublication);
});
/* 
    Route          /publications
    description    get specific publication with id
    Access         Public
    Parameter      id
    Method         get
*/
// http://localhost:3000/publication-id/1
app.get("/publication/:id",async (req,res)=>{
    let {id} = req.params;
    id = Number(id);
    const getspecificpublication =await publicationModel.find({ID :id});
    if(getspecificpublication.length===0){
        return res.json({"error":`No author found for the id of ${id}`});
    }
    return res.json(getspecificpublication[0]);
} );
/* 
    Route          /publications
    description    get specific publication with isbn
    Access         Public
    Parameter      isbn
    Method         get
*/
// http://localhost:3000/publication-isbn/12345two
app.get("/publication-isbn/:isbn", async (req,res)=>{
    const{isbn} = req.params;
    const getspecificpublication = await publicationModel.find({BOOKS : isbn});
    if (getspecificpublication.length===0) {
        return res.json({"error":`no publication found for the isbn of ${isbn}`});
    }
    return res.json(getspecificpublication);
});

/* 
    Route          /book
    description    add new books
    Access         Public
    Parameter      None
    Method         post
*/
app.post("/book", async (req,res)=>{
    const addnewBook = await BookModel.create(req.body);
    return res.json({
        bookAdded : addnewBook,
        message : "book was added !!"
    });
});
/* 
    Route          /author
    description    add new author
    Access         Public
    Parameter      None
    Method         post
*/
app.post("/author", async (req,res)=>{
    const addnewAuthor = await authorModel.create(req.body);
    return res.json({
        author : addnewAuthor,
        message : "Author was added !!"
    });
});
/* 
    Route          /publication
    description    add new publication
    Access         Public
    Parameter      None
    Method         post
*/
app.post("/publication", async (req,res)=>{
    const addnewPublication = await publicationModel.create(req.body);
    return res.json({
        PublicationAdded : addnewPublication,
        message : "Publication was added !!"
    });
});
/* 
    Route          /book-update
    description    update specific book with isbn
    Access         Public
    Parameter      isbn
    Method         put
*/
app.put("/book-update/:isbn",async (req,res)=>{
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn }, req.body,{new : true});
    return res.json({
        bookUpdated : updateBook,
        message : "book was updated !!"
    });
});
/* 
    Route          /author-update
    description    update specific author with id
    Access         Public
    Parameter      id
    Method         put
*/
// http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req,res)=>{
    let {id} = req.params;
    id = Number(id);
const updateauthor = await authorModel.findOneAndUpdate({ID: req.params.id},req.body,{new : true});
    return res.json({authorUpdated : updateauthor, message: "author was updated !!"});
});
/* 
    Route          /publication-update
    description    update specific publication with id
    Access         Public
    Parameter      id
    Method         put
*/
app.put("/publication-update/:id", async (req,res)=>{
    let {id} = req.params;
    id = Number(id);
    const updatepublication = await publicationModel.findOneAndUpdate({ID: req.params.id},req.body,{new : true});
    return res.json({publicationUpdated : updatepublication, message: "publication was updated !!"});
});
/* 
    Route          /book-delete
    description    delete specific book with isbn
    Access         Public
    Parameter      isbn
    Method         delete
*/
app.delete("/book-delete/:isbn", async (req,res)=>{
    const{isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ ISBN : isbn });
    return res.json({
        bookUpdated :deleteBook,
        message : "book was deleted !!"
    })
});
/* 
    Route          /author-delete
    description    delete specific author with id
    Access         Public
    Parameter      id
    Method         delete
*/
app.delete("/author-delete/:id", async (req,res)=>{
    // console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    const deleteauthor = await authorModel.deleteOne({ID : id});

        return res.json({authordeleted : deleteauthor, message: "author was deleted !!"});
   
});
/* 
    Route          /publication-delete
    description    delete specific publication with id
    Access         Public
    Parameter      id
    Method         delete
*/
app.delete("/publication-delete/:id", async (req,res)=>{  
    // console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    const deletepublication = await publicationModel.deleteOne({ID : id});

    return res.json({publicationdeleted : deletepublication, message: "publication was deleted !!"});
});
/* 
    Route          /book-author-delete
    description    delete specific author id form specific book isbn
    Access         Public
    Parameter      isbn,id
    Method         delete
*/
// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id",async (req,res)=>{
    let {isbn,id} = req.params;
    id = Number(id);
    const getSpecificBook = await BookModel.findOne({ISBN : isbn});
    if (getSpecificBook===null) {
        return res. json({"error":`no book found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.AUTHOR.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn }, getSpecificBook,{new : true});
      return res.json({
          bookUpdated : updateBook,
          message :"Author was deleted from the book!!!"
      } );
    }

});
/* 
    Route          /author-book-delete
    description    delete specific book  from specific author id
    Access         Public
    Parameter      isbn,id
    Method         delete
*/
// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn",async (req,res)=>{
    let {isbn,id} = req.params;
    id = Number(id);
    const getSpecificauthor = await authorModel.findOne({ID : id});
    if (getSpecificauthor===null) {
        return res. json({"error":`no author found for the ID of ${id}`});
    }
    else{
        getSpecificauthor.BOOKS.remove(isbn);
        const updateauthor = await authorModel.findOneAndUpdate({ ID: req.params.id }, getSpecificauthor,{new : true});       
      return res.json({
          authorUpdated : updateauthor,
          message :"Book was deleted from the author!!!"
      } );
    }
});
/* 
    Route          /publication-book-delete
    description    delete specific book isbn  with specific publication id
    Access         Public
    Parameter      isbn,id
    Method         delete
*/
// http://localhost:3000/publication-book-delete/1/12345ONE
app.delete("/publication-book-delete/:id/:isbn", async (req,res)=>{
    let {isbn,id} = req.params;
    id = Number(id);
    const getSpecificpublication = await publicationModel.findOne({ID : id});
    if (getSpecificpublication===null) {
        return res. json({"error":`no publication found for the ID of ${id}`});
    }
    else{
        getSpecificpublication.BOOKS.remove(isbn);
        const updatepublication = await publicationModel.findOneAndUpdate({ ID: req.params.id }, getSpecificpublication,{new : true});       
      return res.json({
          publicationUpdated : updatepublication,
          message :"Book was deleted from the publication!!!"
      } );
    }
});

app.listen(3000,()=>{
    console.log("My express App Is Running");
})