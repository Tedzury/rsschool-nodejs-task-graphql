import { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInt } from "graphql";
import { MemberTypeIdEnum } from "../types/member.js";
import { UUIDType } from "../types/uuid.js";

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

const createPostType = new GraphQLInputObjectType({
  name: "CreatePost",
  fields: { 
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }
});

const changePostType = new GraphQLInputObjectType({
  name: "ChangePost",
  fields: { 
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }
});

const createProfileType = new GraphQLInputObjectType({
  name: "CreateProfile",
  fields: {
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});

const changeProfileType = new GraphQLInputObjectType({
  name: "ChangeProfile",
  fields: {
    memberTypeId: { type: MemberTypeIdEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});


export { createUserType, changeUserType, createPostType, changePostType, createProfileType, changeProfileType };
