module.exports = `
    type Query {
        user: User!
    }
    type Mutation {
        makeTransaction(input: TransactionInput!, save: SaveReciever = NO): Transaction
        registerUser (input: UserInput!): User
        submitQuiz (input: QuizInput): Quiz
    }
    type User {
        id: ID!
        realName: String!
        accountNumber: String!
        balance: Int!
        categories: [Category]
        transactions: [Transaction]
        quizs: [Quiz]
    }
    input UserInput {
        realName: String!
        accountNumber: String!
        balance: Int!
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
        date: String
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
    type Quiz {
        date: String!
        monthlyBudget(input: Budget): Int
        monthlyExpense: [Expense]
        limitExpense: [Expense]
    }
    input QuizInput {
        vibBudget: Int
        otherBankBudget: Int
        cashBudget: Int
        eWalletBudget: Int
        monthlyExpense: [ExpenseInput]
        limitExpense: [ExpenseInput]
    }
    type Expense {
        category: Category
        maxAmount: Int,
        currentAmount: Int = 0
    }
    input ExpenseInput {
        category: CategoryInput
        maxAmount: Int,
    }
`;
