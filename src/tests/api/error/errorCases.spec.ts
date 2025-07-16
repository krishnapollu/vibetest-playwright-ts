import { test, expect } from '../../../testSetup';
import axios from 'axios';
import { logApiInteraction } from '../../../utils/logger';
import users from '../../../data/reqresUsers.json';
import logger from '../../../utils/logger';

const BASE_URL = 'https://reqres.in/api';

test.describe('Reqres Error Scenarios', () => {
  test('should return 404 for user not found', async () => {
    try {
      await axios.get(`${BASE_URL}/users/23`);
    } catch (err: any) {
      logApiInteraction({
        method: 'GET',
        url: `${BASE_URL}/users/23`,
        requestHeaders: err.config?.headers,
        responseStatus: err.response.status,
        responseHeaders: err.response.headers,
        responseBody: err.response.data
      });
      expect(err.response.status).toBe(404);
      expect(err.response.status).toBe(404);
    }
  });

  test('should fail register with missing password', async () => {
    const { email } = users[2];
    try {
      await axios.post(`${BASE_URL}/register`, { email });
    } catch (err: any) {
      logApiInteraction({
        method: 'POST',
        url: `${BASE_URL}/register`,
        requestHeaders: err.config?.headers,
        requestBody: { email },
        responseStatus: err.response.status,
        responseHeaders: err.response.headers,
        responseBody: err.response.data
      });
      expect(err.response.status).toBe(400);
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toBe('Missing password');
    }
  });

  test('should handle delayed response', async () => {
    const res = await axios.get(`${BASE_URL}/users?delay=3`);
    logApiInteraction({
      method: 'GET',
      url: `${BASE_URL}/users?delay=3`,
      requestHeaders: res.config.headers,
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.data)).toBeTruthy();
  });
}); 