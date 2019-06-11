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

  // POST route for saving a new author
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

   // DELETE route for deleting authors
   app.delete("/api/posts/:id", function(req, res) {
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
  app.put("/api/posts", function(req, res) {
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

