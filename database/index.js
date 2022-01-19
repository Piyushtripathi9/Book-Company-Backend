let Books = [
    {
    ISBN : "12345ONE",
    TITLE : "GETTING STARTED WITH MERN",
    AUTHOR : [1,2],
    LANGUAGE : "EN",
    PUB_DATE : "2021-07-07",
    NUM_OF_PAGES : 342,
    CATEGORY : ["FICTION","PROGRAMING","TECH.","WEB-DEV"],
    PUBLICATION : 1,

},
{
    ISBN : "12345TWO",
    TITLE : "GETTING STARTED WITH PYTHON",
    AUTHOR : [1,2],
    LANGUAGE : "EN",
    PUB_DATE : "2021-08-12",
    NUM_OF_PAGES : 556,
    CATEGORY : ["FICTION","TECH.","WEB-DEV"],
    PUBLICATION : 1, 
}
];
let Authors = [{
    ID : 1,
    NAME : "NIKHIL",
    BOOKS : ["12345ONE","12345TWO"],
},
{
    ID : 2,
    NAME : "RAM",
    BOOKS : ["12345ONE","12345TWO"],
}
];
let Publication = [{
    ID : 1,
    NAME : "SHAPEAI PUBLICATION",
    BOOKS : ["12345ONE","12345TWO"],
},
{
    ID : 2,
    NAME : " GUPTA PUBLICATION",
    BOOKS : [""] ,
}];

module.exports = {Books,Authors,Publication};