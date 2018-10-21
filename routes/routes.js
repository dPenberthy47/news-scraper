var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//Requiring models
var db = require("../models");

//Connecting to MongoDB
mongoose.connect(
    "mongodb://localhost/scraperHomework", { useNewUrlParser: true }
);


module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Posts.find({}, function (error, data) {
            var hbsObject = {
                post: data
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    })

    // scrape  
    app.get("/scrape", function (req, res) {

        axios.get("https://medium.com/").then(function (response) {

            // load response to cheerio
            var $ = cheerio.load(response.data);

            $("section.eu").each(function (i, element) {

                var result = {};

                var urlPortion = $(element)
                    .find("a")
                    .attr("href");

                var mediumUrl = "https://medium.com"

                var fullUrl = mediumUrl + urlPortion;

                result.title = $(element)
                    .find("h3")
                    .text()
                result.summary = $(element)
                    .find("p")
                    .text()
                result.url = fullUrl;


                db.Posts.create(result)
                    .then(function (newPost) {
                        // View the added result in the console
                        console.log(newPost);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });

            });

            res.send("Scrape complete!");
        });
    });

    // Route for getting all Articles from the db
    app.get("/posts", function (req, res) {
        // Grab every document in the Articles collection
        db.Posts.find({})
            .then(function (results) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(results);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // clear
    app.get('/clear', function (req, res) {
        db.Posts.remove({}, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log('cleared');
            }

        });
        res.redirect('/');
    });

    // this is working // posts are saving
    app.post("/posts/saved/:id", function (req, res) {
        // Use the article id to find and update its saved boolean
        db.Posts.findOneAndUpdate({ "_id": req.params.id }, { "saved": true })
            // Execute the above query
            .exec(function (err, data) {
                // Log any errors
                if (err) {
                    console.log(err);
                }
                else {

                    res.send(data);
                }
            });
    });


    app.get('/saved', function (req, res) {
        db.Posts.find({ "saved": true })
        .then(function (results) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(results);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

};