class User {
  constructor({
    _id,
    realName,
    accountNumber,
    balance,
    categories,
    transactions
  }) {
    this.id = _id;
    this.realName = realName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.categories = categories;
    this.transactions = transactions;
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
    this.category = {
      name: category.name,
      iconName: category.iconName,
      subCategories: [
        {
          name: category.subCategoryName,
          iconName: category.subCategoryIconName
        }
      ]
    };
    this.date = date ? date : new Date();
  }
}
module.exports = {
  User,
  Transaction
};
