var db = require("../models");
var express = require("express");
var app = express();


module.exports = function(app) {
  // Get all authors
  app.get("/api/book", function(req, res) {
    db.Book.findAll({}).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Get route for returning authors of a specific category
  app.get("/api/books/category/:category", function(req, res) {
    db.Book.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbBooks) {
        res.json(dbBooks);
      });
  });

  // Get route for retrieving a single author
  app.get("/api/book/:id", function(req, res) {
    db.Book.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBook) {
        res.json(dbBook);
      });
  });


   // DELETE route for deleting authors
   app.delete("/api/book/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating authors
  app.put("/api/book", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};

  

  // Delete an example by id
  app.delete("/api/book/:id", function(req, res) {
    db.Book.destroy({ where: { id: req.params.id } }).then(function(dbBook) {
      res.json(dbBook);
    });
  });
