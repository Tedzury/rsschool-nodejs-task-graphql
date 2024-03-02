import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList } from 'graphql';
import { userType, profileType, postType, memberType } from './queries.js';
import { createUserType, changeUserType } from './mutations.js';
import { UUIDType } from '../types/uuid.js';
import { DbType, MutationsArgs, CreateUserInputArgs} from '../types/prismaTypes.js';
import MemberIdType from '../types/memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType as GraphQLObjectType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: (_, args: { id: string }, context: DbType) => {
        return context.user.findUnique({ where: { id: args.id }})
      }
    },
    users: {
      type: new GraphQLList(userType),
      resolve: (_, __, context: DbType) => {
        return context.user.findMany()
      } 
    },
    profile: { 
      type: profileType as GraphQLObjectType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: (_, args: { id: string }, context: DbType) => {
        return context.profile.findUnique({ where: { id: args.id }})
      }
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: (_, __, context: DbType) => {
        return context.profile.findMany();
      }
    },
    post: {
      type: postType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      }, 
      resolve: (_, args: { id: string }, context: DbType) => {
        return context.post.findUnique({ where: { id: args.id } })
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: (_, __, context: DbType) => {
        return context.post.findMany();
      }
    },
    memberType: {
      type: memberType as GraphQLObjectType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberIdType)
        }
      },
      resolve: (_, args: { id: MemberTypeId }, context: DbType ) => {
        return context.memberType.findUnique({ where: { id: args.id }})
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberIdType),
      resolve: (_, __, context: DbType) => {
        return context.memberType.findMany();
      }
    },
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType as GraphQLObjectType,
      args: {
        inputObj: {
          type: new GraphQLNonNull(createUserType)
        }
      },
      resolve: (_, args: MutationsArgs<CreateUserInputArgs>, context: DbType) => {
        return context.user.create({ data: args.inputObj });
      }
    },
    changeUser: {
      type: userType as GraphQLObjectType,
      args: {
        inputObj: { type: new GraphQLNonNull(changeUserType) },
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: (_, args: MutationsArgs<Partial<CreateUserInputArgs>>, context: DbType) => {
        return context.user.update({ where: { id: args.id }, data: args.inputObj });
      }
    },
    deleteUser: {
      type: userType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: MutationsArgs<null>, context: DbType) => {
        await context.user.delete({ where: { id: args.id } });
        return true;
      }
    }
  }
});

const graphQlSchema = new GraphQLSchema({ query: Query, mutation: Mutation });

export default graphQlSchema;
