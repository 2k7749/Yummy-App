import express, { Request, Response, NextFunction } from 'express';
import { Vandor, FoodDoc } from '../models';


export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
    .sort([[ 'rating', 'descending' ]])
    .populate("foods") // Obj Foods in Vandors

    const result_food = await Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
    .populate("foods") // Obj Foods in Vandors

    if(result.length > 0){
        let foodResult: any = [];

        result_food.map(vandor => {
            const foods = vandor.foods as [FoodDoc]
            foodResult.push(...foods.filter(food => food.readyTime <= 30)) // GET FOOD 30 MINS <
        })

        return res.status(200).json({"categories":[{"id":1,"title":"Burgers","icon":"https://online-foods.herokuapp.com/images/burger.jpg"},{"id":2,"title":"Pizzas","icon":"https://online-foods.herokuapp.com/images/pizzas.jpg"},{"id":3,"title":"Coffee","icon":"https://online-foods.herokuapp.com/images/coffee.jpg"},{"id":4,"title":"Meals","icon":"https://online-foods.herokuapp.com/images/meals.jpg"}], restaurants: result, foods: foodResult})
    }
    return res.status(400).json({ message: 'Data not Found!' })
 
}

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
    .sort([[ 'rating', 'descending' ]])
    .limit(10)

    if(result.length > 0){
        return res.status(200).json(result)
    }
    return res.status(400).json({ message: 'Data not Found!' })

}

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
    .populate("foods") // Obj Foods in Vandors

    if(result.length > 0){

        let foodResult: any = [];

        result.map(vandor => {
            const foods = vandor.foods as [FoodDoc]
            
            foodResult.push(...foods.filter(food => food.readyTime <= 30)) // GET FOOD 30 MINS <
        })

        return res.status(200).json(foodResult)
    }
    return res.status(400).json({ message: 'Data Not Found!' })
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode; // >1000 must using cache

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
    .populate("foods") // Obj Foods in Vandors

    if(result.length > 0){

        let foodResult: any = [];

        result.map(item => foodResult.push(...item.foods))

        return res.status(200).json(foodResult)

    }
    return res.status(400).json({ message: 'Data Not Found!' })

}

export const RestaurantById = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    const result = await Vandor.findById(id)
    .populate("foods") // Obj Foods in Vandors

    if(result){
        return res.status(200).json(result)
    }
    return res.status(400).json({ message: 'Data Not Found!' })

}