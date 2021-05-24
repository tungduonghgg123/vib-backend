var { findOne, insert, update } = require("./index");
var ObjectId = require("mongodb").ObjectId;
const { budget } = require("../graphQL/constants");

const insertNewContactToCategories = (input, categories) => {
  const existCategoryIndex = categories.findIndex(
    ({ name }) => name === input.name
  );
  if (existCategoryIndex > -1) {
    const existSubCategoryIndex = categories[
      existCategoryIndex
    ].subCategories.findIndex(
      ({ name }) => name === input.subCategories[0].name
    );
    if (existSubCategoryIndex > -1) {
      //   check for duplicated contact
      const duplicatedContactIndex = categories[
        existCategoryIndex
      ].subCategories[existSubCategoryIndex].contacts.findIndex(
        ({ accountNumber }) =>
          accountNumber === input.subCategories[0].contacts[0].accountNumber
      );
      if (duplicatedContactIndex === -1)
        categories[existCategoryIndex].subCategories[
          existSubCategoryIndex
        ].contacts.push(input.subCategories[0].contacts[0]);
    } else {
      //   sub category not exist
      categories[existCategoryIndex].subCategories.push(input.subCategories[0]);
    }
  } else {
    // category not exist =>
    categories.push(input);
  }
  // console.log(JSON.stringify(categories, null, 2));
  return categories;
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
const updateRemainingBudget = async (id, transaction) => {
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
module.exports = { insertNewContactToCategories, updateExpensePlan };
