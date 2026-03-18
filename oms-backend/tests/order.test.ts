import request from 'supertest';
import express from 'express';
import orderRoutes from '../src/routes/orderRoutes';
import authRoutes from '../src/routes/authRoutes';
import { AppDataSource } from '../src/config/database';
import { Product } from '../src/entities/Product';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

describe('Orders API', () => {
  let token: string;
  let testProductId: string;

  beforeAll(async () => {
    const testEmail = `order-test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    await request(app).post('/api/auth/register').send({ email: testEmail, password: testPassword });
    const loginRes = await request(app).post('/api/auth/login').send({ email: testEmail, password: testPassword });
    token = loginRes.body.token;

    // Create a dummy product
    const product = new Product();
    product.name = 'Test Product';
    product.description = 'Test Desc';
    product.price = 10.0;
    product.stock = 100;
    
    if (AppDataSource.isInitialized) {
      const savedProduct = await AppDataSource.manager.save(product);
      testProductId = savedProduct.id;
    }
  });

  afterAll(async () => {
     // Clean up would go here
  });

  it('should create an order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: testProductId, quantity: 2 }]
      });

    expect(res.status).toBe(201);
  });
  
  it('should fetch user orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
