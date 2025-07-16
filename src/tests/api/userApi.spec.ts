import { UserApi } from '../../api/userApi';
import logger from '../../utils/logger';
import { test, expect } from '@playwright/test';
import { TestData } from '../../utils/testData';
import { validateSchema } from '../../utils/schemaValidator';

const userApi = new UserApi();

test.describe('User API', () => {
  test('should fetch user by id', async () => {
    const userId = '1';
    const response = await userApi.getUser(userId);
    logger.info(`Fetched user: ${JSON.stringify(response.data)}`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test('should use static test data', async () => {
    const staticUser = TestData.loadJson('sampleUser.json');
    logger.info(`Static user data: ${JSON.stringify(staticUser)}`);
    expect(staticUser.email).toContain('@');
  });

  test('should use dynamic fake user', async () => {
    const fakeUser = TestData.fakeUser();
    logger.info(`Fake user data: ${JSON.stringify(fakeUser)}`);
    expect(fakeUser.email).toContain('@');
  });

  test('should validate user schema', async () => {
    const userId = '1';
    const response = await userApi.getUser(userId);
    const userSchema: any = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        // Add more fields as needed
      },
      required: ['id', 'name', 'email'],
      additionalProperties: true
    };
    const { valid, errors } = validateSchema(response.data, userSchema);
    expect(valid, `Schema errors: ${errors?.join(', ')}`).toBe(true);
  });
}); 