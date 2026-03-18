import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await AppDataSource.manager.find(Product);
    res.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
