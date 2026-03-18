import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/authRoutes';
import { AppDataSource } from '../src/config/database';
import { User } from '../src/entities/User';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'password123';

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.manager.delete(User, { email: testEmail });
    }
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
