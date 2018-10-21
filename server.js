var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

var Posts = require("./models/Posts")

// serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));

// routes
require("./routes/routes.js")(app)

// start server
app.listen(PORT, function () {
  // log when server starts
  console.log("Server listening on: http://localhost:" + PORT);
});

module.exports=app;