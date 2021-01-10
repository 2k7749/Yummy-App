import { CreateFoodInputs } from './../dto/Food.dto';
import { ValidatePassword, GenerateSignature } from './../utility';
import { FindVandor } from './AdminController';
import { Request, Response, NextFunction } from 'express';
import { VandorLoginInputs, EditVandorInputs } from '../dto';
import { Food } from '../models';

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VandorLoginInputs>req.body;

    const existingVandor = await FindVandor('', email);

    if(existingVandor !== null){

        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt)
        if(validation){

            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodTypes: existingVandor.foodType,
                name: existingVandor.name
            })

            return res.json(signature)

        }
        else{
            return res.json({ message : "Password is a not Valid" })
        }

    }
    return res.json({ message : "Login credential not Valid" })


}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){

        const existingVandor = await FindVandor(user._id)
        return res.json(existingVandor)

    }
    return res.json({ message : "Vandor information Not Found" })

}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { foodTypes, name, address, phone } = <EditVandorInputs>req.body;

    const user = req.user;

    if(user){

        const existingVandor = await FindVandor(user._id)
        
        if(existingVandor !== null){
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodTypes;

            const savedResult = await existingVandor.save()
            return res.json(savedResult)
        }

    }
    return res.json({ message : "Vandor inf. not Found" })

}

export const UpdateVandorCoverImage = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){
           
        const vandor = await FindVandor(user._id)

        if(vandor !== null){

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)

            vandor.images.push(...images);
            
            const result = await vandor.save();

            return res.json(result)
        }

    }
    return res.json({ message : "Something went wrong with Add Food" })

}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    if(user){

        const existingVandor = await FindVandor(user._id)
        
        if(existingVandor !== null){
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;

            const savedResult = await existingVandor.save()
            return res.json(savedResult)
        }

    }
    return res.json({ message : "Vandor inf. not Found" })

}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){
       
        const { name, description, category, foodType, readyTime, price} = <CreateFoodInputs>req.body;
    
        const vandor = await FindVandor(user._id)

        if(vandor !== null){

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)

            const createFood = await Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: images,
                readyTime: readyTime,
                price: price,
                rating: 0
            })

            vandor.foods.push(createFood); // Push DATA to doc.[Foods]
            const result = await vandor.save();

            return res.json(result)
        }
    }
    return res.json({ message : "Something went wrong with add food" })

}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    if(user){

       const foods = await Food.find({ vandorId: user._id })
       if(foods !== null){
           return res.json(foods)
       }

    }
    return res.json({ message : "Foods infomation Not Found" })

}