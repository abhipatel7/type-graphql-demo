import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { sendEmail } from '../../utils/sendEmail';
import { createConfirmationUrl } from '../../utils/createConfirmationUrl';
import { getHashedPassword } from '../../utils/hashedPassword';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async helloWorld() {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async register(
    @Arg('input') { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await getHashedPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail({
      email,
      url: await createConfirmationUrl(user.id),
      subject: 'Verification Link',
      text: 'Click on the link below to verify your account with us.',
    });

    return user;
  }
}
