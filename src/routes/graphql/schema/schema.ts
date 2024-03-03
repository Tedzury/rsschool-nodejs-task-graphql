import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLBoolean } from 'graphql';
import { userType, profileType, postType, memberType } from './queries.js';
import { createUserType, changeUserType, createPostType, changePostType, createProfileType, changeProfileType } from './mutations.js';
import { UUIDType } from '../types/uuid.js';
import { DbType, MutationsArgs, CreateUserInputArgs, CreatePostInputArgs, CreateProfileInputArgs, SubsManageArgs } from '../types/prismaTypes.js';
import { MemberTypeIdEnum } from '../types/member.js';
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
          type: new GraphQLNonNull(MemberTypeIdEnum)
        }
      },
      resolve: (_, args: { id: MemberTypeId }, context: DbType ) => {
        return context.memberType.findUnique({ where: { id: args.id }})
      }
    },
    memberTypes: {
      type: new GraphQLList(memberType),
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
        dto: {
          type: new GraphQLNonNull(createUserType)
        }
      },
      resolve: (_, args: MutationsArgs<CreateUserInputArgs>, context: DbType) => {
        return context.user.create({ data: args.dto });
      }
    },

    changeUser: {
      type: userType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: changeUserType },
      },
      resolve: (_, args: MutationsArgs<Partial<CreateUserInputArgs>>, context: DbType) => {
        return context.user.update({ where: { id: args.id }, data: args.dto });
      }
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: MutationsArgs<null>, context: DbType) => {
        await context.user.delete({ where: { id: args.id } });
        return true;
      }
    },

    createProfile: {
      type: profileType as GraphQLObjectType,
      args: {
        dto: { type: new GraphQLNonNull(createProfileType)},
      },
      resolve: (_, args: MutationsArgs<CreateProfileInputArgs>, context: DbType) => {
        return context.profile.create({ data: args.dto })
      }
    },

    changeProfile: {
      type: profileType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType)},
        dto: { type: changeProfileType },
      },
      resolve: (_, args: MutationsArgs<Partial<CreateProfileInputArgs>>, context: DbType) => {
        return context.profile.update({ where: { id: args.id},  data: args.dto })
      }
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: async (_, args: MutationsArgs<null>, context: DbType) => {
        await context.profile.delete({ where: { id: args.id }});
        return true;
      }
    },

    createPost: {
      type: postType as GraphQLObjectType,
      args: {
        dto: {
          type: new GraphQLNonNull(createPostType)
        }
      },
      resolve: (_, args: MutationsArgs<CreatePostInputArgs>, context: DbType) => {
        return context.post.create({ data: args.dto });
      }
    },

    changePost: {
      type: postType as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: changePostType
        },
      },
      resolve: (_, args: MutationsArgs<Partial<CreatePostInputArgs>>, context: DbType) => {
        return context.post.update({ where: { id: args.id }, data: args.dto });
      }
    }, 

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        }
      },
      resolve: async (_, args: MutationsArgs<null>, context: DbType) => {
        await context.post.delete({ where: { id: args.id }});
        return true;
      }
    },

    subscribeTo: {
      type: userType as GraphQLObjectType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: SubsManageArgs, context: DbType) => {
        const res = await context.user.update({ where: { id: args.userId }, data: { 
          userSubscribedTo: { create: { authorId: args.authorId }}
        }});
        return res;
      }
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: SubsManageArgs, context: DbType) => {
        await context.subscribersOnAuthors.delete({ where: { subscriberId_authorId: {
          subscriberId: args.userId, authorId: args.authorId
        } }})
        return true;
      }
    }
  }
});

const graphQlSchema = new GraphQLSchema({ query: Query, mutation: Mutation });

export default graphQlSchema;
