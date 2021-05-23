var { User, Transaction, Quiz } = require("./class");
var { findOne, insert, update } = require("../mongoDB/index");
var ObjectId = require("mongodb").ObjectId;
const { budget } = require("./constants");

const getUserId = request => {
  if (!request.headers.userid)
    throw new Error("userid is needed in the header");
  return request.headers.userid;
};
const updateExpensePlan = async (id, transaction) => {
  // get expense list for this month: (workaround: just get the first quiz)
  const quiz = (await findOne({ _id: ObjectId(id) })).quizs[0];
  checkForCategoryInExpense(id, transaction, quiz.monthlyExpense);
  checkForCategoryInExpense(id, transaction, quiz.limitExpense, "limitExpense");
  updateRemainingBudget(id, transaction, quiz);
};
const checkForCategoryInExpense = (
  id,
  transaction,
  expense,
  kind = "monthlyExpense"
) => {
  const amount = transaction.amount;
  const category = transaction.category.name;
  if (Array.isArray(expense)) {
    expense.forEach((_expense, index) => {
      if (_expense.category.name === category) {
        // update the database right away
        update(
          {
            _id: ObjectId(id)
          },
          {
            $inc: {
              ["quizs.0." + kind + "." + index + ".currentAmount"]: amount
            }
          }
        );
      }
    });
  }
};
const updateRemainingBudget = async (id, transaction, quiz) => {
  update(
    {
      _id: ObjectId(id)
    },
    {
      $inc: {
        ["quizs.0." + budget[transaction.from]]: -transaction.amount
      }
    }
  );
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
    // TODO: make this to O(1) instead of O(n)
    // based on category, loop through expenseList's category and increase if matches
    // TODO: this can be run independently after finished a transaction.
    updateExpensePlan(id, transaction);
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
