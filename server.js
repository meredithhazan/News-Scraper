var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Note = require("./models/Note.js"),
	Article = require("./models/Article.js"),
	request = require("request"),
	cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static("public"));

mongoose.connect("mongodb://heroku_rprg7395:fflb88vaj58nnrv2meqsf3jct4@ds133094.mlab.com:33094/heroku_rprg7395");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connected successfully.");
});

// Routes

/*app.get("/", function(req, res) {
  res.send(index.html);
});*/

app.get("/scrape", function(req, res) {
	request("https://www.entrepreneur.com", function(err, res, html) {
		var $ = cheerio.load(html);
		$("div.block").each(function(i, element) {
			var result = {};
			result.topic = $(this).children("a.kicker").text();
			var test = $(this).children("h3").children("a.ga-click");
			
			if (test.data("ga-action") == "headline") {
				//console.log(test.text());
				//console.log(test.data("ga-action"));
				result.title = test.text();
				result.link = test.attr("href");
				//console.log("Headline: " + result.title);
				//console.log("Link: " + result.link);
				
				var entry = new Article(result);
				entry.save(function(err, doc) {
					if (err) {
						console.log(err);
					} else {
						console.log(doc);
					}
				});
			}; 
		});
	});
	res.redirect("/articles");
});

app.get("/articles", function(req, res) {
	Article.find({/*"isSaved": false*/}, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.post("/saved/:id", function(req, res) {
	Article.findOneAndUpdate({"_id": req.params.id}, {"isSaved": true})
	.exec(function(err, saved) {
		if (err) {
			console.log(error);
		} else {
			res.send(saved);
		}
	});			
});

app.get("/saved", function(req, res) {
	Article.find({"isSaved": true}, function(err, doc) {
		if (err) {
			console.log(err);
		} else {
			res.send(doc);
		}
	});
});


app.listen(process.env.PORT || 3000, function() {
	console.log("App running on port 3000!");
});