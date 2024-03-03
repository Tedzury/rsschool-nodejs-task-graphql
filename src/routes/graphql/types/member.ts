import { GraphQLEnumType } from "graphql";

const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    business: {
      value: 'business'
    },
    basic: {
      value: 'basic'
    }
  }
});

export {MemberTypeIdEnum};