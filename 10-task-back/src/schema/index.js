const { makeExecutableSchema, gql } = require('apollo-server')
const resolvers = require('../resolvers')
// require('graphql-import-node')
// const typeDefs = require('./schema.gql')
const { readFileSync } = require('fs')
const typeDefs = gql(readFileSync(__dirname.concat('/schema.gql'), 'utf8'))


const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema
