import { Connection } from 'typeorm';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

import { gCall } from '../../../test-utils/gCall';
import { testConn } from '../../../test-utils/testConn';
import { User } from '../../../entity/User';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
  dotenv.config();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Mutation($input: RegisterInput!) {
    register(input: $input) {
      id
      firstName
      email
      lastName
      name
    }
  }
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        input: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
  });
});
