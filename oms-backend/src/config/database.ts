import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'oms_user',
  password: process.env.DB_PASSWORD || 'oms_password',
  database: process.env.DB_NAME || 'oms_database',
  synchronize: true, // Auto-create tables for dev
  logging: false,
  entities: [User, Product, Order, OrderItem],
  subscribers: [],
  migrations: [],
});
