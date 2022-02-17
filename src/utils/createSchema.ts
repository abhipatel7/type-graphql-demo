import { buildSchema } from 'type-graphql';

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../modules/{,!(__test__)}/*.ts'],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
