var MongoClient = require('mongodb').MongoClient,
assert = require('assert');


function ProductDOA(database) {
	this.db = database;

	this.getPlatformsCategories = function(callback) {
		var pipeline = [{"$group": {_id: "$platform", num: {"$sum" : 1} } }, {"$sort": {_id: 1} }];
    	this.db.collection("games").aggregate(pipeline).toArray(function(err, platforms) {
	        assert.equal(null, err);
	        var total = 0;
	        for (var i=0; i<platforms.length; i++) {
	            total += platforms[i].num;
	        }
	        platforms.unshift({_id: "All", num: total});
	        callback(platforms);
    	});
	};

	this.getItems = function(platform, page, itemsPerPage, callback) {
	    var queryDoc;
	    console.log(platform, page, itemsPerPage)
	    if (platform == "All") {
	        queryDoc = {};
	    } else {
	        queryDoc = {platform: platform};
	    }

	    var cursor = this.db.collection("games").find(queryDoc);
	    cursor.skip(page*itemsPerPage);
	    cursor.limit(itemsPerPage);
	    cursor.toArray(function(err, pageItems) {
	        assert.equal(null, err);
	        callback(pageItems);
	    });
	};

	this.getItemsByRating = function(rating, page, itemsPerPage, callback) {
	    var queryDoc;
	    console.log(rating, page, itemsPerPage)
	    if (platform == "All") {
	        queryDoc = {};
	    } else {
	        queryDoc = {score: rating};
	    }

	    var cursor = this.db.collection("games").find(queryDoc);
	    cursor.skip(page*itemsPerPage);
	    cursor.limit(itemsPerPage);
	    cursor.toArray(function(err, pageItems) {
	        assert.equal(null, err);
	        callback(pageItems);
	    });
	};

	this.getNumItems = function(category, callback) {
	    "use strict";

	    var queryDoc;
	    if (category == "All") {
	        queryDoc = {};
	    } else {
	        queryDoc = {category: category};
	    }

	    this.db.collection("games").find(queryDoc).count(function(err, count) {
	        assert.equal(null, err);
	        callback(count);
	    });
	};

	this.searchProduct = function(query, numberOfItem, page, numberOfItemPerPage, callback) {
	    var queryDoc;
	    if (query.trim() == "") {
	        queryDoc = {};
	    } else {
	        queryDoc = { "$text": {"$search": query} };
	    }

	    var cursor = this.db.collection("games").find(queryDoc);
	    cursor.skip(page*itemsPerPage);
	    cursor.limit(itemsPerPage);
	    cursor.toArray(function(err, pageItems) {
	        assert.equal(null, err);
	        callback(pageItems);
	    });

	};

	this.getNumSearchItems = function(query, callback) {
	    "use strict";

	    var queryDoc;
	    if (query.trim() == "") {
	        queryDoc = {};
	    } else {
	        queryDoc = { "$text": {"$search": query} };
	    }

	    this.db.collection("games").find(queryDoc).count(function(err, count) {
	        assert.equal(null, err);
	        callback(count);
	    });
	};

	this.getItem = function(itemId, callback) {
	    this.db.collection("games").find({_id: itemId}).toArray(function(err, docs) {
	        assert.equal(null, err);
	        var itemDoc = null;
	        if (docs.length > 0) {
	            itemDoc = docs[0];
	        }
	        callback(itemDoc);
	    });
	};
}

module.exports.ProductDOA = ProductDOA;