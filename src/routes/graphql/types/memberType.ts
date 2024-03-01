import { GraphQLEnumType } from "graphql";

const MemberIdType = new GraphQLEnumType({
  name: 'MemberIdType',
  values: {
    business: {
      value: 'business'
    },
    basic: {
      value: 'basic'
    },
  }
});

export default MemberIdType;