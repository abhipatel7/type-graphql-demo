import {
  ClassType,
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
} from 'type-graphql';
import { Middleware } from 'type-graphql/dist/interfaces/Middleware';

export function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware ?? []))
    async create(@Arg('input', () => inputType) input: any) {
      return await entity.create(input).save();
    }
  }

  return BaseResolver;
}
