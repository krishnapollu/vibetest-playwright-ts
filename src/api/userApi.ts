import { BaseApi } from './baseApi';

export class UserApi extends BaseApi {
  async getUser(userId: string) {
    return this.get(`/users/${userId}`);
  }
} 