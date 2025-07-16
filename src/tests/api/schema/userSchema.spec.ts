import { test, expect } from '../../../testSetup';
import axios from 'axios';
import Ajv from 'ajv';
import { logApiInteraction } from '../../../utils/logger';
import schemas from '../../../data/reqresSchemas.json';
import endpoints from '../../../data/reqresEndpoints.json';
import logger from '../../../utils/logger';

const BASE_URL = endpoints.baseUrl;
const ajv = new Ajv();

const userSchema = schemas.user;

test('should validate user schema', async () => {
  const res = await axios.get(`${BASE_URL}${endpoints.users}/2`);
  logApiInteraction({
    method: 'GET',
    url: `${BASE_URL}${endpoints.users}/2`,
    requestHeaders: res.config.headers,
    responseStatus: res.status,
    responseHeaders: res.headers,
    responseBody: res.data
  });
  const validate = ajv.compile(userSchema);
  const valid = validate(res.data);
  expect(valid, JSON.stringify(validate.errors)).toBe(true);
}); 