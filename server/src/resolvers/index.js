const Query = require("./Query");
const Mutation = require("./Mutation");

const resolvers = {
  Query,
  Mutation,
  Node: {
    __resolveType() {
      return null;
    }
  }
};

module.exports = resolvers;
