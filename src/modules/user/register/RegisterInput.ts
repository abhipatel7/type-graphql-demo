import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PasswordMixin } from '../../shared/PasswordMixin';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255, {
    message: 'First Name must be between 1 to 255 characters.',
  })
  firstName: string;

  @Field()
  @Length(1, 255, {
    message: 'Last Name must be between 1 to 255 characters.',
  })
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'Enter a valid email.' })
  @IsEmailAlreadyExist({ message: 'Email already taken.' })
  email: string;
}
