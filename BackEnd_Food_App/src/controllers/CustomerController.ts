import express, { Request, Response, NextFunction } from 'express';
import { CreateCustomerInputs, UserLoginInputs, EditCustomerProfileInputs, OrderInputs } from './../dto/Customer.dto';
import { GenerateSalt, GenerateOtp, GeneratePassword, GenerateSignature, ValidatePassword, onRequestOTP } from '../utility';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Customer } from '../models/Customer';
import { Food } from '../models';
import { Order } from '../models/Order';

export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInputs, req.body)

    const inputErrors = await validate(customerInputs, { validationError: {target: true} });

    if(inputErrors.length > 0){
        return res.status(409).json({ message: 'Error with Signup'})
    }

    const { email, phone, password } = customerInputs;

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword( password, salt)

    const { otp, expiry } = GenerateOtp();
    
    const existCustomer = await Customer.findOne({ email: email })

    if(existCustomer !== null){
        return res.status(409).json({ message: 'An user exist with the provided email ID' })
    }

    // console.log(otp, expiry);

    // return res.json('working...')


    const result = await Customer.create({

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

    })

    if(result){

        // Send the OTP to customer 
        await onRequestOTP(otp, phone)
        //generate the signature
        const signature = GenerateSignature({
            _id: result.id,
            email: result.email,
            verified: result.verified
        })
        //send the result to client
        return res.status(201).json({ signature: signature, verified: result.verified, email: result.email })

    }

    return res.status(400).json({ message: 'Error with Signup'})

}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

    const loginInputs = plainToClass(UserLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, { validationError: { target: false } })

    if(loginErrors.length > 0){
        return res.status(400).json(loginErrors)
    }

    const { email, password } = loginInputs;
    const customer = await Customer.findOne({ email: email })

    if(customer){

        const validation = await ValidatePassword(password, customer.password, customer.salt);

        if(validation){
            //generate the signature
        const signature = GenerateSignature({
            _id: customer.id,
            email: customer.email,
            verified: customer.verified
        })
        return res.status(201).json({ 
            signature: signature, 
            verified: customer.verified, 
            email: customer.email})
        }

    }
    return res.status(404).json({ message: 'An error occurred while performing login' })
}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
   
    const{ otp } = req.body;

    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id)

        if(profile){

            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){ // Checking

                profile.verified = true;

                const updateCustomerResponse = await profile.save();

                const signature = GenerateSignature({
                    _id: updateCustomerResponse.id,
                    email: updateCustomerResponse.email,
                    verified: updateCustomerResponse.verified
                });

                return res.status(201).json({ 
                    signature: signature, 
                    verified: updateCustomerResponse.verified, 
                    email: updateCustomerResponse.email})

            }

        }
    }
    return res.status(400).json({ message: 'An error occurred while Verify Account With OTP' })
}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id);

        if(profile){

            const { otp, expiry } = GenerateOtp();

            profile.otp = otp;
            profile.otp_expiry = expiry;

            await profile.save();
            await onRequestOTP(otp, profile.phone);

            console.log("OTP CLIENT REQUEST: " + otp, expiry);

            return res.status(200).json({ message: 'OTP sent your Registered phoneNumber!' })
        }
    }
    return res.status(400).json({ message: 'There was an error asking NEW OTP' })

}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;
    
    if(customer){

        const profile = await Customer.findById(customer._id);

        if(profile){
            return res.status(200).json(profile)
        }

    }
    return res.status(400).json({ message: 'Error When Fetch Profile Inf.' })

}

export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;
    const profileInputs = plainToClass( EditCustomerProfileInputs , req.body);
    const profileErrors = await validate(profileInputs, { validationError: { target: false }})

    if(profileErrors.length > 0){
        return res.status(400).json(profileErrors);
    }

    const { firstName, lastName, address } = profileInputs; 

    if(customer){

        const profile = await Customer.findById(customer._id);

        if(profile){

            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();
             
            res.status(200).json(result)
        }

    }
    return res.status(400).json({ message: 'There was an error in execution Change Profile' })

}

export const CreateOrder = async (req: Request, res: Response, next: NextFunction) => {

    //Get Infomation User Login
    const customer = req.user;

    if(customer){
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;

        const profile = await Customer.findById(customer._id);

        const cart = <[OrderInputs]>req.body; // <= req body ID PRODUCT + UNIT 

        console.log("ITEM ORDER SENT TO SERVER IS: " + JSON.stringify(cart));

        let cartItems = Array();

        let netAmount = 0.0;

        const foods = await Food.find().where('_id').in(cart.map( item => item._id )).exec();

        foods.map( food => {
            cart.map( ({ _id, unit }) => {
                if(food._id == _id){
                    netAmount += (food.price * unit);
                    cartItems.push({ food, unit })
                }
            })
        })
        //CREATE NEW ORDER
        if(cartItems){
            const currentOrder = await Order.create({
                orderID: orderId,
                items: cartItems,
                totalAmount: netAmount,
                orderDate: new Date(),
                paidThrough: 'COD',
                paymentResponse: '',
                orderStatus: 'Waiting'
            })

            if(currentOrder){

                profile.orders.push(currentOrder);
                await profile.save();
                
                return res.status(200).json(currentOrder);
            }

        }
    }

    return res.status(400).json({ message: 'An Occurred Create Order' })

}

export const GetOrders = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id).populate("orders");

        if(profile){
            return res.status(200).json(profile.orders);
        }
    }
    
}

export const GetOrderById = async (req: Request, res: Response, next: NextFunction) => {

    const orderId = req.params.id;

    if(orderId){
        const order = await Order.findById(orderId).populate("items.food");

        
            return res.status(200).json(order);
    }
    
}