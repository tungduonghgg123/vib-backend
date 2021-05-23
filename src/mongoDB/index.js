var MongoClient = require("mongodb").MongoClient;
var { databaseName, collectionName, url } = require("./constants");

const insert = input => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).insertOne(input, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });

    db.close();
  });
};

const findOne = () => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
};

const query = queryObject => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(databaseName);
      dbo
        .collection(collectionName)
        .find(queryObject)
        .toArray(function(err, result) {
          if (err) throw err;
          resolve(result);
          db.close();
        });
    });
  });
};

const sort = sortObject => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo
      .collection(collectionName)
      .find()
      .sort(sortObject)
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  });
};

const deleteQuery = query => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
};

const update = (query, value, option) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo
      .collection(collectionName)
      .updateOne(query, value, option, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  });
};

update(
  { address: "gan nha Duong" },
  {
    $set: {
      country: "VN"
    },
    $inc: {
      revenue: 10
    }
  },
  {
    upsert: true
  }
);
