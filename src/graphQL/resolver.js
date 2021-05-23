var contactByCategories = require("../../fakeData");
var { User, Transaction } = require("./class");
var { findOne, insert, update } = require("../mongoDB/index");
var ObjectId = require("mongodb").ObjectId;

const getUserId = request => {
  if (!request.headers.userid)
    throw new Error("userid is needed in the header");
  return request.headers.userid;
};
module.exports = {
  user: async (_, request) => {
    const id = getUserId(request);
    const result = await findOne({ _id: ObjectId(id) });
    return new User(result);
  },
  makeTransaction: ({ input, save }, request) => {
    getUserId(request);
    // construct a Transaction
    const transaction = new Transaction(input);
    // Insert a transaction to User(userId)'s transactions
    const id = getUserId(request);
    update(
      {
        _id: ObjectId(id)
      },
      {
        $push: { transactions: transaction }
      }
    );
    return transaction;
  },
  registerUser: async ({ input }) => {
    // Write new user to database
    const result = await insert(input);
    // If success return User
    return new User(result);
  }
};
