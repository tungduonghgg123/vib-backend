var contactByCategories = require("../../fakeData");
var { User, Transaction } = require("./class");
var { insert, update } = require("../mongoDB/index");
var ObjectId = require("mongodb").ObjectId;
const user = {
  realName: "tungduong",
  accountNumber: "123456789",
  balance: 9999999999,
  categories: contactByCategories,
  transactions: []
};
module.exports = {
  user: (_, request) => {
    console.log(request.headers.userid);
    return user;
  },
  makeTransaction: ({ input, save }, request) => {
    // construct a Transaction
    const transaction = new Transaction(input);
    // Insert a transaction to User(userId)'s transactions
    const userId = request.headers.userid;
    if (!userId) throw "userid is needed in the header";
    update(
      {
        _id: ObjectId(userId)
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
