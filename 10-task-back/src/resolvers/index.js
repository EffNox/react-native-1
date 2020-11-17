const mutation = require("./mutation");
const query = require("./query");

const resolvers = {
    ...query,
    ...mutation
}

module.exports = resolvers;
