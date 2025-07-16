import dotenv from 'dotenv';
dotenv.config();

export const BASE_URL = process.env.BASE_URL || 'https://demoblaze.com';
export const API_URL = process.env.API_URL || 'http://localhost:4000/api'; 