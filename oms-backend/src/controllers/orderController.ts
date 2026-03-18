import { Response } from 'express';
import { AppDataSource } from '../config/database';
import { Order, OrderStatus } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { Product } from '../entities/Product';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { items } = req.body; // Array of { productId, quantity }
    
    if (!items || !items.length) {
      res.status(400).json({ error: 'Order must contain items' });
      return;
    }

    const userId = req.user!.id; // Authenticated user

    let total_price = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await queryRunner.manager.findOneBy(Product, { id: item.productId });
      
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Decrement stock
      product.stock -= item.quantity;
      await queryRunner.manager.save(product);

      const orderItem = new OrderItem();
      orderItem.product_id = product.id;
      orderItem.quantity = item.quantity;
      orderItem.unit_price = product.price;
      
      orderItems.push(orderItem);
      total_price += product.price * item.quantity;
    }

    const order = new Order();
    order.user_id = userId;
    order.total_price = total_price;
    order.status = OrderStatus.PENDING;
    order.items = orderItems; // cascade save

    await queryRunner.manager.save(order);
    await queryRunner.commitTransaction();

    res.status(201).json(order);
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    console.error('Create order error:', error);
    res.status(400).json({ error: error.message || 'Error creating order' });
  } finally {
    await queryRunner.release();
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orders = await AppDataSource.manager.find(Order, {
      where: { user_id: userId },
      relations: ['items', 'items.product'],
      order: { created_at: 'DESC' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orderId = req.params.id as string;

    const order = await AppDataSource.manager.findOne(Order, {
      where: { id: orderId, user_id: userId },
      relations: ['items', 'items.product']
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orderId = req.params.id as string;
    const { status } = req.body; 
    
    // Simplistic full update logic. Real world would update items as well.
    const order = await AppDataSource.manager.findOneBy(Order, { id: orderId, user_id: userId });
    
    if (!order) {
       res.status(404).json({ error: 'Order not found' });
       return;
    }
    
    order.status = status || order.status;
    await AppDataSource.manager.save(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const patchOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orderId = req.params.id as string;
    const { status } = req.body;

    const order = await AppDataSource.manager.findOneBy(Order, { id: orderId, user_id: userId });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    if (status && Object.values(OrderStatus).includes(status)) {
      order.status = status;
      await AppDataSource.manager.save(order);
      res.json(order);
    } else {
      res.status(400).json({ error: 'Invalid config or status' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const orderId = req.params.id as string;

    const order = await AppDataSource.manager.findOneBy(Order, { id: orderId, user_id: userId });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    await AppDataSource.manager.remove(order);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
