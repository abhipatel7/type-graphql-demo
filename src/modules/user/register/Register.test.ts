import { Connection } from 'typeorm';
import dotenv from 'dotenv';

import { gCall } from '../../../test-utils/gCall';

import { testConn } from '../../../test-utils/testConn';

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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          input: {
            password: '123456',
            firstName: 'Abhishek',
            lastName: 'Patel',
            email: 'test@test.com',
          },
        },
      })
    );
  });
});
