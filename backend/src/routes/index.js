import {Router} from 'express';
import customer_service from './customer_services.js';
import signUp from './register/signUp.js';
import logIn from './register/logIn.js';
import customers from './browser/customers.js';
import employees from './employees.js';
import orders_create from './shopping/orders_create.js';
import orders_manage from './shopping/orders_manage.js';
import basket from './shopping/basket.js';
import products from './browser/products.js';
import purchases from './purchases.js';
import auth from './register/auth.js';
import password from './register/password.js';


const router = Router();
router.use('/customer_services', customer_service)
router.use('/customers', customers)
router.use('/employees', employees)
router.use('/orders_create', orders_create)
router.use('/products', products)
router.use('/purchases', purchases)
router.use('/orders_manage', orders_manage)
router.use('/basket', basket)
router.use('/password', password)
router.use('/signUp', signUp);
router.use('/auth', auth);
router.use('/logIn', logIn);

export default router;
