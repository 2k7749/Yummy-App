"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const CommonAuth_1 = require("./../middlewares/CommonAuth");
const CustomerController_1 = require("./../controllers/CustomerController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.CustomerRoute = router;
// Signup / Create customer
router.post('/signup', CustomerController_1.CustomerSignup);
// Login
router.post('/login', CustomerController_1.CustomerLogin);
// Authentication
router.use(CommonAuth_1.Authenticate);
// Verify Customer Account
router.patch('/verify', CustomerController_1.CustomerVerify);
//OTP / Requesting OTP
router.get('/otp', CustomerController_1.RequestOtp);
//Profile
router.get('/profile', CustomerController_1.GetCustomerProfile);
router.patch('/profile', CustomerController_1.EditCustomerProfile);
//Cart
//Order
router.post('/create-order', CustomerController_1.CreateOrder);
router.get('/orders', CustomerController_1.GetOrders);
router.get('/order/:id', CustomerController_1.GetOrderById);
//# sourceMappingURL=CustomerRoute.js.map