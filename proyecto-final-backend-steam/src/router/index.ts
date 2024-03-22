import { Router } from 'express';
import authRoutes from './auth.route';
import productoRoutes from './producto.route'
import pedidoRoutes from './pedido.route'

const router = Router();

router.use('/auth', authRoutes);
router.use('/product', productoRoutes)
router.use('/pedido', pedidoRoutes)


export default router;