var db = require("../models");

module.exports = function(app) {
  // Get all authors
  app.get("/api/post", function(req, res) {
    db.Bookshelf.findAll({}).then(function(dbBookshelfs) {
      res.json(dbBookshelfs);
    });
  });

  // Get route for returning authors of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    db.Bookshelf.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbBookshelfs) {
        res.json(dbBookshelfs);
      });
  });

  // Get route for retrieving a single author
  app.get("/api/posts/:id", function(req, res) {
    db.Bookshelf.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBookshelf) {
        res.json(dbBookshelf);
      });
  });




  // Create a new example
  app.post("/api/post", function(req, res) {
    db.Bookshelf.create(req.body).then(function(dbBookshelf) {
      res.json(dbBookshelf);
    });
  });

  // Delete an example by id
  app.delete("/api/post/:id", function(req, res) {
    db.Bookshelf.destroy({ where: { id: req.params.id } }).then(function(dbBookshelf) {
      res.json(dbBookshelf);
    });
  });
};
