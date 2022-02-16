import { Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PasswordInput {
  @Field()
  @Min(5, {
    message: 'Password must be greater than or equal to 5 characters.',
  })
  password: string;
}
