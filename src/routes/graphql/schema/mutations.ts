import { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInt } from "graphql";
import { MemberTypeIdEnum } from "../types/member.js";
import { UUIDType } from "../types/uuid.js";

const createUserType = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: {
    name: { type: GraphQLString},
    balance: { type: GraphQLFloat }
  }
});

const changeUserType = new GraphQLInputObjectType({
  name: "ChangeUserInput",
  fields: {
    name: { type:  GraphQLString },
    balance: { type: GraphQLFloat }
  }
});

const createPostType = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: { 
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }
});

const changePostType = new GraphQLInputObjectType({
  name: "ChangePostInput",
  fields: { 
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  }
});

const createProfileType = new GraphQLInputObjectType({
  name: "CreateProfileInput",
  fields: {
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});

const changeProfileType = new GraphQLInputObjectType({
  name: "ChangeProfileInput",
  fields: {
    memberTypeId: { type: MemberTypeIdEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});


export { createUserType, changeUserType, createPostType, changePostType, createProfileType, changeProfileType };
