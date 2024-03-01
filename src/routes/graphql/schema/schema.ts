import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import DbType from '../types/prismaType.js';
import MemberIdType from '../types/memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  })
});

const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberIdType },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt }
  })
});

const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: { type: MemberIdType }
  })
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType }
  })

})


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
    memberType: {
      type: memberType,
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
    profile: { 
      type: profileType,
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
    }
  })
});

const graphQlSchema = new GraphQLSchema({ query: Query });

export default graphQlSchema;
