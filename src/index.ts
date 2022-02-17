import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { redis } from './redis';
import { createSchema } from './utils/createSchema';

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = Express();

  app.use(cors());

  const RedisStore = connectRedis(session);

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: 'qid',
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql');
  });
};

main();
