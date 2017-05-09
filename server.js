var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var product = require('./routes/product').ProductDOA;	
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ITEMS_PER_PAGE = 6;

MongoClient.connect('mongodb://localhost:27017/products', function(err, db) {
	"use strict";
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    var products = new product(db);
    var router = express.Router();

    app.get('/', function(req, res) {
    	res.render('index.html');
    });


	app.get('/getPlatformsData', function(req, res) {
		var page = req.query.page ? parseInt(req.query.page) : 0;
        var category = req.query.category ? req.query.category : "All";

        if(page<0) {
        	return;
        }

        products.getPlatformsCategories(function(platforms) {
            products.getItems(category, page, ITEMS_PER_PAGE, function(pageItems) {
                products.getNumItems(category, function(itemCount) {
                    var numPages = 0;
                    if (itemCount > ITEMS_PER_PAGE) {
                        numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
                    }

                     res.json({ category_param: category,
                                         categories: platforms,
                                         useRangeBasedPagination: false,
                                         itemCount: itemCount,
                                         pages: numPages,
                                         page: page,
                                         items: pageItems });                 
                });
            });
        });
	});

    app.get("/searchByRating", function(req, res) {
        var page = req.query.page ? parseInt(req.query.page) : 0;
        var rating = req.query.rating ? req.query.rating : "";

        console.log(rating);

        if(rating<0 || rating>10) {
        	return;	
        }

        items.getItemsByRating(rating, page, ITEMS_PER_PAGE, function(pageItems) {
                var numPages = 0;
                if (itemCount > ITEMS_PER_PAGE) {
                    numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
                }
                res.json({ 
                           itemCount: itemCount,
                           pages: numPages,
                           page: page,
                           items: pageItems });
                
         
        });
    });
});


var port = process.env.PORT || 8080;
var server = app.listen(port,function(req,res) {
      console.log("Server running at port " + port);
});