import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import graphQlSchema from './schema/schema.js';
import maxDepth from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {

  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, res) {
      const { query, variables } = req.body;
      const errors = validate(graphQlSchema, parse(query), [maxDepth(5)]);
      if (errors.length) {
        return res.send({errors});
      }
      return graphql({schema: graphQlSchema, source: query, contextValue: prisma, variableValues: variables });
    },
  });
};

export default plugin;
