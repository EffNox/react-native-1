const { ApolloServer } = require('apollo-server');
const { valJwt } = require('./middlewares/jwt');
const schema = require('./src/schema')
const { parsed: { PORT, GQL } } = require('dotenv').config()
require('./config/db').dbCon();


const server = new ApolloServer({ schema, playground: !0, context: ({ req }) => valJwt(req) })
server.listen(PORT, () => console.log(GQL))
