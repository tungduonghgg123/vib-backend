var MongoClient = require("mongodb").MongoClient;
var { url, databaseName } = require("./constants");
var url = url + "/" + databaseName;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
