var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models"); // requires models for syncing

app.use(express.urlencoded({ extended: true })); // sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.static("public")); // static directory

require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() { // syncs sequelize models and then starts Express app
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});