import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models';
import { GenerateSalt, GeneratePassword } from '../utility';


export const FindVandor = async (id: string | undefined, email?: string) => { // Find Basiclly Vandor With Email | ID to check AVAILABLE IT

    if(email){
        return await Vandor.findOne({ email: email })
    }else{
        return await Vandor.findById(id)
    }

}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => { // Create new a Vandor

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVandorInput>req.body;

    const existingVandor = await FindVandor('', email)

     //generate a salt
     const salt = await GenerateSalt()
     //encrypt the password using wth the salt
     const userPassword = await GeneratePassword(password, salt);

    if(existingVandor !== null){
        return res.json({ message : "A vandor is exist with this email ID" })
    }

    const createdVandor = await Vandor.create({
        name: name, 
        address: address, 
        pincode: pincode, 
        foodType: foodType, 
        email: email, 
        password: userPassword, 
        salt: salt,
        ownerName : ownerName, 
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        images: [],
        foods: []
    })
    return res.json(createdVandor)
    
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => { // Get All. Info Vandors

    const vandors = await Vandor.find()

    if(vandors !== null){
        return res.json(vandors)
    }
    return res.json({ message: "Vandors data not available" })
  
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => { // Get Inf. Vandor from ID

    const vandorId = req.params.id;

    const vandor = await FindVandor(vandorId)

    if(vandor !== null){
        return res.json(vandor)
    }
    return res.json({ message: "Vandors ID is not available"})

}