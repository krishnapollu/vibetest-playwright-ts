import { test, expect } from '../../../testSetup';
import axios from 'axios';
import { logApiInteraction } from '../../../utils/logger';
import endpoints from '../../../data/reqresEndpoints.json';
import logger from '../../../utils/logger';

const BASE_URL = endpoints.baseUrl;

test.describe('Reqres Users CRUD', () => {
  test('should list users', async () => {
    const res = await axios.get(`${BASE_URL}${endpoints.users}?page=1`);
    logApiInteraction({
      method: 'GET',
      url: `${BASE_URL}${endpoints.users}?page=1`,
      requestHeaders: res.config.headers,
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.data)).toBeTruthy();
  });

  test('should get single user', async () => {
    const res = await axios.get(`${BASE_URL}${endpoints.users}/2`);
    logApiInteraction({
      method: 'GET',
      url: `${BASE_URL}${endpoints.users}/2`,
      requestHeaders: res.config.headers,
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(res.data.data.id).toBe(2);
  });

  test('should create user', async () => {
    const res = await axios.post(`${BASE_URL}${endpoints.users}`, { name: 'morpheus', job: 'leader' });
    logApiInteraction({
      method: 'POST',
      url: `${BASE_URL}${endpoints.users}`,
      requestHeaders: res.config.headers,
      requestBody: { name: 'morpheus', job: 'leader' },
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('id');
  });

  test('should update user', async () => {
    const res = await axios.put(`${BASE_URL}${endpoints.users}/2`, { name: 'neo', job: 'the one' });
    logApiInteraction({
      method: 'PUT',
      url: `${BASE_URL}${endpoints.users}/2`,
      requestHeaders: res.config.headers,
      requestBody: { name: 'neo', job: 'the one' },
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(200);
    expect(res.data.name).toBe('neo');
  });

  test('should delete user', async () => {
    const res = await axios.delete(`${BASE_URL}${endpoints.users}/2`);
    logApiInteraction({
      method: 'DELETE',
      url: `${BASE_URL}${endpoints.users}/2`,
      requestHeaders: res.config.headers,
      responseStatus: res.status,
      responseHeaders: res.headers,
      responseBody: res.data
    });
    expect(res.status).toBe(204);
  });
}); 