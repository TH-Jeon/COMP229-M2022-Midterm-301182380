/* 
Server - Routes - books.ts
Taehyun Jeon, 301182380
My Favourite Books List Web Application
*/

// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details', { title: 'Books', page: 'books', books: {}})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const aNewBook = new book({ "Title": req.body.title, "Price": req.body.price, "Author": req.body.author, "Genre":req.body.genre })
    
    book.create(aNewBook, function(err: CallbackError)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      res.redirect('/books');
    })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;
    
    book.findById(id, {}, {}, function(err, editingBook)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      res.render('books/details', { title: "Add", page: "edit", books: editingBook});
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;
    const updatingBook = new book({ "_id": id, "Title": req.body.title, "Price": req.body.price, "Author": req.body.author, "Genre": req.body.genre });

    book.updateOne({ _id: id }, updatingBook, function(err: CallbackError)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      res.redirect('/books');
    })
  });

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;

    book.remove({ _id: id }, function(err: CallbackError)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      res.redirect('/books');
    })
});


//module.exports = router;
