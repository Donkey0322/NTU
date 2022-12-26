import {Router} from 'express';
import customer_service from './customer_services.js';
import customers from './customers.js';
import employees from './employees.js';
import orders from './orders.js';
import products from './products.js';
import purchases from './purchases.js';


const router = Router();
router.use('/customer_services', customer_service)
router.use('/customers', customers)
router.use('/employees', employees)
router.use('/orders', orders)
router.use('/products', products)
router.use('/purchases', purchases)

export default router;