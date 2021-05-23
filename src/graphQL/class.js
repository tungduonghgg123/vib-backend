class User {
  constructor({ _id, realName, accountNumber, balance }) {
    this.id = _id;
    this.realName = realName;
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
}
module.exports = {
  User
};
