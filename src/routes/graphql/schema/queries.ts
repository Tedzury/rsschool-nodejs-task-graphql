import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLID } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import {DbType} from '../types/prismaTypes.js';
import { MemberTypeIdEnum } from '../types/member.js';
import { MemberTypeId } from '../../member-types/schemas.js';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: profileType as GraphQLObjectType,
      resolve: (parentObj: { id: string }, _, context: DbType) => {
        return context.profile.findUnique({ where: { userId: parentObj.id }})
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: (parentObj: { id: string }, _, context: DbType) => {
        return context.post.findMany({ where: { authorId: parentObj.id }})
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: (parentObj: { id: string }, _, context: DbType) => {
        return context.subscribersOnAuthors.findMany({ where: { subscriberId: parentObj.id } })
          .then((res) => res.map((model) => context.user.findUnique({ where: { id: model.authorId } })))
      }
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: (parentObj: { id: string }, _, context: DbType) => {
        return context.subscribersOnAuthors.findMany({ where: { authorId: parentObj.id } })
          .then((res) => res.map((model) => context.user.findUnique({ where: { id: model.subscriberId } })))
      }
    },
  })
});

const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: MemberTypeIdEnum },
    user: {
      type: userType as GraphQLObjectType,
      resolve: (parentObj: { userId: string, memberTypeId: MemberTypeId }, _, context: DbType) => {
        return context.user.findUnique({ where: { id: parentObj.userId }});
      }
    },
    memberType: {
      type: memberType as GraphQLObjectType,
      resolve: (parentObj: { userId: string, memberTypeId: MemberTypeId }, _, context: DbType) => {
        return context.memberType.findUnique({ where: { id: parentObj.memberTypeId }})
      }
    },
  })
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: userType as GraphQLObjectType,
      resolve: (parentObj: { authorId: string }, _, context: DbType) => {
        return context.user.findUnique({ where: { id: parentObj.authorId } })
      }
    }
  })
})

const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: (parentObj: { id: MemberTypeId }, _, context: DbType) => {
        return context.profile.findMany({ where: { memberTypeId: parentObj.id } })
      }
    }
  })
});

export { userType, profileType, postType, memberType };
