var { buildSchema } = require("graphql");
var express = require("express");
var { graphqlHTTP } = require("express-graphql");

var MongoClient = require("mongodb").MongoClient;

var graphQLSchema = require("./graphQL/graphQLSchema");
var graphQLResolver = require("./graphQL/resolver");

const schema = buildSchema(graphQLSchema);
const loggingMiddleware = (req, res, next) => {
  // This will magically send req to resolvers's context argument
  next();
};

var app = express();
app.use(loggingMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
