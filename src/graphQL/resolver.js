var { User, Transaction, Quiz } = require("./class");
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
    const id = getUserId(request);
    const transaction = new Transaction(input);
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
    const result = await insert(input);
    return new User(result);
  },
  submitQuiz: async ({ input }, request) => {
    // TODO: Submit a quiz once a month
    const id = getUserId(request);
    const quiz = new Quiz(input);
    update(
      {
        _id: ObjectId(id)
      },
      {
        $push: { quizs: quiz }
      }
    );

    return quiz;
  }
};
