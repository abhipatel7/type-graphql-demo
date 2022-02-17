import { MinLength } from 'class-validator';
import { ClassType, Field, InputType } from 'type-graphql';

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(5, {
      message: 'Password must be greater than or equal to 5 characters.',
    })
    password: string;
  }
  return PasswordInput;
};
