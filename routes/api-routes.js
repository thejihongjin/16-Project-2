var db = require("../models");

module.exports = function(app) {
  app.get("/api/tables", function(req, res) {
    db.Table.findAll({}).then(function(dbTable) {
      res.json(dbTable);
    });
  });

  app.post("/api/tables", function(req, res) {
    db.Todo.create({
      column1: req.body.column1,
      column2: req.body.column2
    }).then(function(dbTable) {
      res.json(dbTable);
    }).catch(function(err) {
      // whenever a validation or flag fails, an error is thrown
      // we can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  app.delete("/api/tables/:id", function(req, res) {
    db.Table.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTable) {
      res.json(dbTable);
    });

  });

  app.put("/api/tables", function(req, res) {
    db.Table.update({
      column1: req.body.column1,
      column2: req.body.column2
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTable) {
      res.json(dbTable);
    }).catch(function(err) {
        res.json(err);
      });
  });
};