var db = require("../models");

module.exports = function(app) {
    // Get all books
    app.get("/api/books", function(req, res) {
        db.Book.findAll({
            // order: "title"
        }).then(function(dbBooks) {
            res.json(dbBooks);
        });
    });
    // app.get("/api/temp", function(req, res) {});
    // app.post("/api/temp", function(req, res) {
    //     axios
    //         .get(
    //             "https://www.goodreads.com/search.xml?key=XTxG7pAsNm9tvSADYVoug&q=" +
    // 				req.body.title
    //         )
    //         .then(function(response) {
    //             var result = convert.xml2json(response.data, {
    //                 compact: true,
    //                 spaces: 4
    //             });
    //             var bookInfo = JSON.parse(result);
    //             console.log(
    //                 bookInfo.GoodreadsResponse.search.results.work[0].best_book
    //             );
    //             res.json(bookInfo);
    //         });
    // });

    // Create a new book
    app.post("/api/books", function(req, res) {
        db.Book.create({
            title: this[0].best_book.title,
            author: this[0].best_book.author.name,
            year: this[0].best_book.original_publication_year.value,
            cover: this[0].best_book.image_url,
            avg_rating: this[0].average_rating
        }).then(function(dbBook) {
            console.log(dbBook);
            res.json(dbBook);
        });
    });

    // Update a book by id
    app.put("/api/books", function(req, res) {
        db.Book.update(
            {
                read: req.body.read
            },
            {
                where: {
                    id: req.body.id
                }
            }
        )
            .then(function(dbBook) {
                res.json(dbBook);
            })
            .catch(function(err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
            });
    });

    // Delete an book by id
    app.delete("/api/books/:id", function(req, res) {
        db.Book.destroy({ where: { id: req.params.id } }).then(function(
            dbBook
        ) {
            res.json(dbBook);
        });
    });
};
