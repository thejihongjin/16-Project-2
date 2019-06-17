var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        db.Book.findAll({}).then(function (dbBooks) {
            res.render("index", {
                books: dbBooks
            });
        });
    });

    // Load book page and pass in an book by id
    app.get("/book/:id", function (req, res) {
        db.Book.findOne({ where: { id: req.params.id } }).then(function (dbBook) {
            res.render("book", {
                book: dbBook
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};
