var express = require('express');
var router = express.Router();
var request = require('request');

// Import data model.
var db = require('../models');

// GET route which calls uses Sequelize's findAll method.
// This route then hands the data it receives to handlebars so index can be rendered.
router.get('/', function (req, res) {
    db.Book.findAll({
        order: 'book_name'

    }).then(function (data) {
        var hbsObject = {
            books: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/year', function (req, res) {
    db.Book.findAll({
        order: 'book_year DESC'

    }).then(function (data) {
        var hbsObject = {
            books: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/rating', function (req, res) {
    db.Book.findAll({
        order: 'book_ratingImd DESC'

    }).then(function (data) {
        var hbsObject = {
            books: data
        };
        res.render('index', hbsObject);
    });
});


// POST route which calls Sequelize's create method with the book name given.
router.post('/api/new/book', function (req, res) {

    var bookName = req.body.name;

    var queryUrl = "https://www.goodreads.com/search.xml?key=MjT6HauT5w0anBEF18C4NA&q=Ender%27s+Game" + bookName;

    request(queryUrl, function (err, res, body) {


        if (!err && JSON.parse(body).Response !== 'False') {
            console.log(JSON.parse(body));

            var isBin = JSON.parse(body).isBin;

            console.log(isBin);

            var books = "";

            var options = {
                method: 'GET',
                url: 'https://www.goodreads.com/book/isbn/ISBN?format=FORMAT' + iSBin + '/books',
                qs: {
                    language: 'en-US',
                    api_key: 'MjT6HauT5w0anBEF18C4NA'
                },
                body: '{}'
            };

            request(options, function (err, res, result) {

                if (err) res.redirect('/');


                // if (err) {
                //     alert("Seems to be a problem with your input. Please try again");
                //     //res.redirect('/');
                // } else {
                if (!JSON.parse(result).results) {
                    // res.send('SOMETHING WENT WRONG');
                    res.redirect('/')
                } else {
                    videos = JSON.parse(result).results[0].key;
                    console.log(videos);
                    db.Book.create({
                        book_name: JSON.parse(body).Title,
                        book_genre: JSON.parse(body).Genre,
                        book_plot: JSON.parse(body).Plot,
                        book_author: JSON.parse(body).Director,
                        book_year: JSON.parse(body).Year,
                        book_ratingisBin: JSON.parse(body).Ratings[0].Value,


                    }).then(function () {
                        res.redirect('/');
                    });

                }
            });

        } else {
            console.log("\nOops...something went wrong with you book search. Try again...");
            res.redirect('/');
        }
    });
});


// update method to mark that book as read.
router.put('/api/new/read/:id', function (req, res) {

    var read = true;
    var ID = req.params.id;

    db.Book.update({
        read: read,

    }, { where: { id: ID } }).then(function () {
        res.redirect('/');
    });
});


// PUT (update) route which calls Sequelize's update method to mark the book as not yet read .
// Sends the id to identify which book. 
router.put('/:id', function (req, res) {
    var read = false;
    var ID = req.params.id;

    db.Book.update({
        read: read,

    }, { where: { id: ID } }).then(function () {
        res.redirect('/');
    });
});

// Deleting a book

router.delete('/api/new/delete/:id', function (req, res) {

    var ID = req.params.id;

    db.Book.destroy({
        where: { id: ID }
    }).then(function () {
        res.redirect('/');
    });
});

// Export routes for server.js.
module.exports = router;