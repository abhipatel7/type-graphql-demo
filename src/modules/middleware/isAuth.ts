import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../../types/MyContext';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!(context.req.session as any).userId) {
    throw new Error('User not authenticated.');
  }

  return next();
};
