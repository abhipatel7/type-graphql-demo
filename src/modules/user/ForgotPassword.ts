import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { forgotPasswordUrl } from '../../utils/forgotPasswordUrl';
import { sendEmail } from '../../utils/sendEmail';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    await sendEmail({
      email,
      url: await forgotPasswordUrl(user.id),
      subject: 'Password Reset Link',
      text: 'Click on the link below to change your account password.',
    });

    return true;
  }
}
