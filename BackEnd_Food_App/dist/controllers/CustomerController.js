"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderById = exports.GetOrders = exports.CreateOrder = exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignup = void 0;
const Customer_dto_1 = require("./../dto/Customer.dto");
const utility_1 = require("../utility");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Customer_1 = require("../models/Customer");
const models_1 = require("../models");
const Order_1 = require("../models/Order");
const CustomerSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = class_transformer_1.plainToClass(Customer_dto_1.CreateCustomerInputs, req.body);
    const inputErrors = yield class_validator_1.validate(customerInputs, { validationError: { target: true } });
    if (inputErrors.length > 0) {
        return res.status(409).json({ message: 'Error with Signup' });
    }
    const { email, phone, password } = customerInputs;
    const salt = yield utility_1.GenerateSalt();
    const userPassword = yield utility_1.GeneratePassword(password, salt);
    const { otp, expiry } = utility_1.GenerateOtp();
    const existCustomer = yield Customer_1.Customer.findOne({ email: email });
    if (existCustomer !== null) {
        return res.status(409).json({ message: 'An user exist with the provided email ID' });
    }
    // console.log(otp, expiry);
    // return res.json('working...')
    const result = yield Customer_1.Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
        orders: []
    });
    if (result) {
        // Send the OTP to customer 
        yield utility_1.onRequestOTP(otp, phone);
        //generate the signature
        const signature = utility_1.GenerateSignature({
            _id: result.id,
            email: result.email,
            verified: result.verified
        });
        //send the result to client
        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email });
    }
    return res.status(400).json({ message: 'Error with Signup' });
});
exports.CustomerSignup = CustomerSignup;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = class_transformer_1.plainToClass(Customer_dto_1.UserLoginInputs, req.body);
    const loginErrors = yield class_validator_1.validate(loginInputs, { validationError: { target: false } });
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    const { email, password } = loginInputs;
    const customer = yield Customer_1.Customer.findOne({ email: email });
    if (customer) {
        const validation = yield utility_1.ValidatePassword(password, customer.password, customer.salt);
        if (validation) {
            //generate the signature
            const signature = utility_1.GenerateSignature({
                _id: customer.id,
                email: customer.email,
                verified: customer.verified
            });
            return res.status(201).json({
                signature: signature,
                verified: customer.verified,
                email: customer.email
            });
        }
    }
    return res.status(404).json({ message: 'An error occurred while performing login' });
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) { // Checking
                profile.verified = true;
                const updateCustomerResponse = yield profile.save();
                const signature = utility_1.GenerateSignature({
                    _id: updateCustomerResponse.id,
                    email: updateCustomerResponse.email,
                    verified: updateCustomerResponse.verified
                });
                return res.status(201).json({
                    signature: signature,
                    verified: updateCustomerResponse.verified,
                    email: updateCustomerResponse.email
                });
            }
        }
    }
    return res.status(400).json({ message: 'An error occurred while Verify Account With OTP' });
});
exports.CustomerVerify = CustomerVerify;
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            const { otp, expiry } = utility_1.GenerateOtp();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            yield utility_1.onRequestOTP(otp, profile.phone);
            return res.status(200).json({ message: 'OTP sent your Registered phoneNumber!' });
        }
    }
    return res.status(400).json({ message: 'There was an error asking NEW OTP' });
});
exports.RequestOtp = RequestOtp;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json(profile);
        }
    }
    return res.status(400).json({ message: 'Error When Fetch Profile Inf.' });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = class_transformer_1.plainToClass(Customer_dto_1.EditCustomerProfileInputs, req.body);
    const profileErrors = yield class_validator_1.validate(profileInputs, { validationError: { target: false } });
    if (profileErrors.length > 0) {
        return res.status(400).json(profileErrors);
    }
    const { firstName, lastName, address } = profileInputs;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            res.status(200).json(result);
        }
    }
    return res.status(400).json({ message: 'There was an error in execution Change Profile' });
});
exports.EditCustomerProfile = EditCustomerProfile;
const CreateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Get Infomation User Login
    const customer = req.user;
    if (customer) {
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
        const profile = yield Customer_1.Customer.findById(customer._id);
        const cart = req.body; // <= req body ID PRODUCT + UNIT 
        let cartItems = Array();
        let netAmount = 0.0;
        const foods = yield models_1.Food.find().where('_id').in(cart.map(item => item._id)).exec();
        foods.map(food => {
            cart.map(({ _id, unit }) => {
                if (food._id == _id) {
                    netAmount += (food.price * unit);
                    cartItems.push({ food, unit });
                }
            });
        });
        //CREATE NEW ORDER
        if (cartItems) {
            const currentOrder = yield Order_1.Order.create({
                orderID: orderId,
                items: cartItems,
                totalAmount: netAmount,
                orderDate: new Date(),
                paidThrough: 'COD',
                paymentResponse: '',
                orderStatus: 'Waiting'
            });
            if (currentOrder) {
                profile.orders.push(currentOrder);
                yield profile.save();
                return res.status(200).json(currentOrder);
            }
        }
    }
    return res.status(400).json({ message: 'An Occurred Create Order' });
});
exports.CreateOrder = CreateOrder;
const GetOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id).populate("orders");
        if (profile) {
            return res.status(200).json(profile.orders);
        }
    }
});
exports.GetOrders = GetOrders;
const GetOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    if (orderId) {
        const order = yield Order_1.Order.findById(orderId).populate("items.food");
        return res.status(200).json(order);
    }
});
exports.GetOrderById = GetOrderById;
//# sourceMappingURL=CustomerController.js.map