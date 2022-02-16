import { v4 } from 'uuid';
import { forgotPasswordPrefix } from '../modules/constants/redisPrefixes';
import { redis } from '../redis';

export const forgotPasswordUrl = async (userId: number) => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 Day

  return `http://localhost:3000/user/change-password/${token}`;
};
