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

    app.get("/api/books/:id", function(req, res) {
        db.Book.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbBook) {
            res.json(dbBook);
        });
    });

    // Create a new book
    app.post("/api/books", function(req, res) {
        db.Book.create({
            title: req.body.title,
            author: req.body.author,
            plot: req.body.plot,
            date: req.body.date,
            cover: req.body.cover,
            genre: req.body.genre,
            avg_rating: req.body.avg_rating
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
