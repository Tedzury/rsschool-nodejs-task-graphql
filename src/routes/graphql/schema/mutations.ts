import { GraphQLInputObjectType, GraphQLString, GraphQLFloat } from "graphql";

const createUserType = new GraphQLInputObjectType({
  name: "CreateUser",
  fields: {
    name: { type:  GraphQLString},
    balance: { type: GraphQLFloat }
  }
});

const changeUserType = new GraphQLInputObjectType({
  name: "ChangeUser",
  fields: {
    name: { type:  GraphQLString},
    balance: { type: GraphQLFloat }
  }
});


export { createUserType, changeUserType };
