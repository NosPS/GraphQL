const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");
const init = require("./database");
const expressPlayground = require("graphql-playground-middleware-express").default;

const app = express();
const cors = require('cors');
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const port = process.env.PORT || "4000";

app.listen(port);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
init.init();