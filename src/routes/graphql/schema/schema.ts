import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import DbType from '../types/prismaInterface.js';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  })
});


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: (_, args: {id: string}, context: DbType) => {
        return context.user.findUnique({ where: { id: args.id }})
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: (_, __, context: DbType) => {
        return context.user.findMany()
      } 
    },
  })
});

const graphQlSchema = new GraphQLSchema({ query: Query });

export default graphQlSchema;
