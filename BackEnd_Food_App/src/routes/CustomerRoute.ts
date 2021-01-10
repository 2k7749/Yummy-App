import { Authenticate } from './../middlewares/CommonAuth';
import { CustomerSignup, CustomerLogin, CustomerVerify, RequestOtp, GetCustomerProfile, EditCustomerProfile, CreateOrder, GetOrders, GetOrderById } from './../controllers/CustomerController';
import express, { Request, Response, NextFunction } from 'express';


const router = express.Router();

// Signup / Create customer
router.post('/signup', CustomerSignup)

// Login
router.post('/login', CustomerLogin)

// Authentication
router.use(Authenticate)

// Verify Customer Account
router.patch('/verify', CustomerVerify)

//OTP / Requesting OTP
router.get('/otp', RequestOtp)

//Profile
router.get('/profile', GetCustomerProfile)
router.patch('/profile', EditCustomerProfile)

//Cart
//Order

router.post('/create-order', CreateOrder);
router.get('/orders', GetOrders);
router.get('/order/:id', GetOrderById);


//Payment

export { router as CustomerRoute };