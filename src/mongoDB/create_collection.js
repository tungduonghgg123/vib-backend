var MongoClient = require("mongodb").MongoClient;
var { databaseName, collectionName, url } = require("./constants");

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(databaseName);
  dbo.createCollection(collectionName, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
