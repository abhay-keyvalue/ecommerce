import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createOrder, getOrders, getOrderById, updateOrder, patchOrder, deleteOrder } from '../controllers/orderController';

const router = Router();

router.use(authenticate); // Apply to all order routes

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.patch('/:id', patchOrder);
router.delete('/:id', deleteOrder);

export default router;
