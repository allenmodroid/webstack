var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    console.log("Connected correctly to server");

        // create or connect to dishes collection
        var collection = db.collection("dishes");

        // insert document
        collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
            assert.equal(err,null);
            console.log("After Insert:");
            console.log(result.ops);

            // Retrieve data from dishes collection
            collection.find({}).toArray(function(err,docs){
                assert.equal(err,null);
                console.log("Found:");
                console.log(docs);
                
                // Drop dishes collections
                db.dropCollection("dishes", function(err, result){
                    assert.equal(err,null);
                    db.close();
                });
            });
        });
});