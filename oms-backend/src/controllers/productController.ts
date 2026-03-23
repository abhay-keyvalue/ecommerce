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

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0];
    if (!id) {
      res.status(400).json({ error: 'Product ID is required' });
      return;
    }
    const product = await AppDataSource.manager.findOneBy(Product, { id });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error('Fetch product by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
