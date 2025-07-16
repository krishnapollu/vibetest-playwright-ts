import { test, expect } from '../../../testSetup';
import axios from 'axios';
import { logApiInteraction } from '../../../utils/logger';
import users from '../../../data/reqresUsers.json';
import logger from '../../../utils/logger';

const BASE_URL = 'https://reqres.in/api';

test.describe('Reqres Auth', () => {
  test('should login successfully', async () => {
    const { email, password } = users[0];
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    logApiInteraction({
      method: 'POST',
      url: `${BASE_URL}/login`,
      requestHeaders: res.config.headers,
      requestBody: { email, password },
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('token');
  });

  test('should fail login with missing password', async () => {
    const { email } = users[1];
    try {
      await axios.post(`${BASE_URL}/login`, { email });
    } catch (err: any) {
      logApiInteraction({
        method: 'POST',
        url: `${BASE_URL}/login`,
        requestHeaders: err.config?.headers,
        requestBody: { email },
        responseStatus: err.response.status,
        responseHeaders: err.response.headers,
        responseBody: err.response.data
      });
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toBe('Missing password');
    }
  });

  test('should register successfully', async () => {
    const { email: regEmail, password: regPassword } = users[0];
    const res = await axios.post(`${BASE_URL}/register`, { email: regEmail, password: regPassword });
    logApiInteraction({
      method: 'POST',
      url: `${BASE_URL}/register`,
      requestHeaders: res.config.headers,
      requestBody: { email: regEmail, password: regPassword },
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('id');
    expect(res.data).toHaveProperty('token');
  });
}); 