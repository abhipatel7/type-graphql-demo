import { User } from '../../entity/User';
import { createResolver } from '../shared/CreateResolver';
import { RegisterInput } from './register/RegisterInput';

export const CreateUserResolver = createResolver(
  'User',
  User,
  RegisterInput,
  User
);
