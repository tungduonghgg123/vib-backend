class User {
  constructor({
    _id,
    realName,
    accountNumber,
    balance,
    categories,
    transactions,
    quizs
  }) {
    this.id = _id;
    this.realName = realName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.categories = categories;
    this.transactions = transactions;
    this.quizs = quizs && quizs.map(quiz => new Quiz(quiz));
  }
}
class Transaction {
  constructor({
    from,
    amount,
    message,
    note,
    category,
    toBudget,
    receiver,
    date
  }) {
    this.from = from;
    this.amount = amount;
    this.message = message;
    this.note = note;
    this.toBudget = toBudget;
    this.receiver = receiver;
    this.category = new Category(category);
    this.date = date || new Date();
  }
}
class Category {
  constructor({ name, iconName, subCategoryName, subCategoryIconName }) {
    this.name = name;
    this.iconName = iconName;
    this.subCategories = {
      name: subCategoryName,
      iconName: subCategoryIconName
    };
  }
}
class Expense {
  constructor({ category, maxAmount }) {
    this.category = new Category(category);
    this.maxAmount = maxAmount;
    this.currentAmount = 0;
  }
}

class Quiz {
  constructor({
    vibBudget,
    otherBankBudget,
    cashBudget,
    eWalletBudget,
    monthlyExpense,
    limitExpense,
    date
  }) {
    this.monthlyExpense = monthlyExpense.map(expense => new Expense(expense));
    this.limitExpense = limitExpense.map(expense => new Expense(expense));
    this.vibBudget = vibBudget;
    this.otherBankBudget = otherBankBudget;
    this.cashBudget = cashBudget;
    this.eWalletBudget = eWalletBudget;
    this.date = date || new Date();
  }
  monthlyBudget({ input }) {
    switch (input) {
      case "VIB":
        return this.vibBudget;
      case "OTHER_BANK":
        return this.otherBankBudget;
      case "E_WALLET":
        return this.eWalletBudget;
      case "CASH":
        return this.cashBudget;
      default:
        throw new Error("budget error");
    }
  }
}
module.exports = {
  User,
  Transaction,
  Quiz
};
