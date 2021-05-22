var { graphql, buildSchema } = require("graphql");
var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var contactByCategories = require("./fakeData");
// console.log(JSON.stringify(contactByCategories));
console.log(contactByCategories);
const user = {
  realName: "tungduong",
  accountNumber: "123456789",
  balance: 9999999999,
  categories: contactByCategories,
  transactions: []
};
const schema = buildSchema(`
    type Query {
        user: User!
    }
    type Mutation {
        makeTransaction(input: TransactionInput!, save: SaveReciever = NO): Transaction
    }
    type User {
        realName: String!
        accountNumber: String!
        balance: Int!
        categories: [Category]
        transactions: [Transaction]
    }
    type Category {
        name: String!
        iconName: String!
        subCategories: [SubCategory]
    }
    input CategoryInput {
        name: String!
        iconName: String!
        subCategoryName: String
        subCategoryIconName: String
    }
    type SubCategory {
        name: String
        iconName: String
        contacts: [Contact]
    }
    type Contact {
        realName: String!
        nickname: String
        accountNumber: String!
        bank: String!
    }
    input ContactInput {
        realName: String!
        nickname: String
        accountNumber: String!
        bank: String!
    }
    type Transaction {
        id: ID!
        from: Budget!
        amount: Int!
        message: String
        note: String
        category: Category
        toBudget: Budget
        receiver: Contact
        date: String!
    }
    input TransactionInput {
        from: Budget!
        amount: Int!
        message: String
        note: String
        category: CategoryInput
        toBudget: Budget
        receiver: ContactInput
        date: String!
    }
    enum Budget {
        VIB
        OTHER_BANK
        E_WALLET
        CASH
    }
    enum SaveReciever {
        WITH_CATEGORY
        WITHOUT_CATEGORY
        NO
    }
`);
const root = {
  user: () => {
    return {
      realName: "tungduong",
      accountNumber: "123456789",
      balance: 9999999999,
      categories: contactByCategories,
      transactions: []
    };
  },
  makeTransaction: ({ input, save }) => {
    var id = require("crypto")
      .randomBytes(10)
      .toString("hex");
    user.transactions.push({ id, ...input });
    return input;
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
