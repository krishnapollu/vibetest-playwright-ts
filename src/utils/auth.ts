import axios from 'axios';
import { API_URL } from '../config/env';

export class Auth {
  private static token: string = '';
  private static cookies: any[] = [];

  // Example: Login via API and store token
  static async loginAndGetToken(credentials: { email: string; password: string }): Promise<string> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (!response.data.token) throw new Error('No token returned from API');
    this.token = response.data.token;
    return this.token;
  }

  // Example: Get stored token
  static getToken(): string {
    if (!this.token) throw new Error('No token stored. Please login first.');
    return this.token;
  }

  // Example: Store session cookies (for UI)
  static setCookies(cookies: any[]) {
    this.cookies = cookies;
  }

  static getCookies(): any[] {
    return this.cookies;
  }
} 