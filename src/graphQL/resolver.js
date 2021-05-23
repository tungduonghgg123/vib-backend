var contactByCategories = require("../../fakeData");
var { User } = require("./class");
var { insert } = require("../mongoDB/index");
const user = {
  realName: "tungduong",
  accountNumber: "123456789",
  balance: 9999999999,
  categories: contactByCategories,
  transactions: []
};
module.exports = {
  user: () => {
    return user;
  },
  makeTransaction: ({ input, save }) => {
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");
    const transaction = { ...input };
    transaction.category = {
      name: input.category.name,
      iconName: input.category.iconName,
      subCategories: [
        {
          name: input.category.subCategoryName,
          iconName: input.category.subCategoryIconName
        }
      ]
    };
    transaction.id = id;
    user.transactions.push(transaction);
    return transaction;
  },
  registerUser: async ({ input }) => {
    // Write new user to database
    const result = await insert(input);
    // If success return User
    return new User(result);
  }
};
