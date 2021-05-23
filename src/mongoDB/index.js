var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var { databaseName, collectionName, url } = require("./constants");

const insert = input => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw new Error(err);
      var dbo = db.db(databaseName);
      dbo.collection(collectionName).insertOne(input, function(err, res) {
        if (err) throw new Error(err);
        resolve(res.ops[0]);
        db.close();
      });
    });
  });
};

const findOne = query => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw new Error(err);
      var dbo = db.db(databaseName);
      dbo.collection(collectionName).findOne(query, function(err, result) {
        if (err) throw new Error(err);
        resolve(result);
        db.close();
      });
    });
  });
};

const query = queryObject => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw new Error(err);
      var dbo = db.db(databaseName);
      dbo
        .collection(collectionName)
        .find(queryObject)
        .toArray(function(err, result) {
          if (err) throw new Error(err);
          resolve(result);
          db.close();
        });
    });
  });
};

const sort = sortObject => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw new Error(err);
    var dbo = db.db(databaseName);
    dbo
      .collection(collectionName)
      .find()
      .sort(sortObject)
      .toArray(function(err, result) {
        if (err) throw new Error(err);
        console.log(result);
        db.close();
      });
  });
};

const deleteQuery = query => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw new Error(err);
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).deleteOne(query, function(err, obj) {
      if (err) throw new Error(err);
      console.log("1 document deleted");
      db.close();
    });
  });
};

const update = (query, value, option) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw new Error(err);
    var dbo = db.db(databaseName);
    dbo
      .collection(collectionName)
      .updateOne(query, value, option, function(err, res) {
        if (err) throw new Error(err);
        console.log("1 document updated");
        db.close();
      });
  });
};

module.exports = {
  insert,
  update,
  findOne
};
