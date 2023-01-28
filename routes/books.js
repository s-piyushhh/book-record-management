const express = require("express");
const {
    getAllBooks,
    getSingleBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById,
 } = require("../controllers/book_controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const { route } = require("./users");
const { UserModel, BookModel } = require("../models");

const router = express.Router();

/*
Route: /books
Method : GET
*Descripytion : Get all the books
Access : Public
Parameters : none
*/
// router.get("/", (req, res) => {
//     res.status(200).json({ success: true, data: books });
// });
router.get("/", getAllBooks);

/*
Route: /books/:id
Method : GET
*Descripytion : Get book by its id
Access : Public
Parameters : id
*/
router.get("/:id", getSingleBookById);

/*
Route: /books/issue/by-user
Method : GET
*Descripytion : Get all issued books
Access : Public
Parameters : none
*/
router.get("/issued/by-user", getAllIssuedBooks);

/*
Route: /books
Method : POST
*Descripytion : Add new books
Access : Public
Parameters : none
*/
router.post("/", addNewBook);

/*
Route: /books/:id
Method : PUT
*Descripytion : Updating A books
Access : Public
Parameters : id
*/
router.put("/:id",updateBookById);



module.exports = router;