import { GetFoodAvailability, GetTopRestaurants, GetFoodsIn30Min, SearchFoods, RestaurantById } from './../controllers/ShoppingController';
import express, { Request, Response, NextFunction } from 'express';


const router = express.Router();

// Food Availability
router.get('/food/availability/:pincode', GetFoodAvailability)

// Top Restaurants
router.get('/top-restaurants/:pincode', GetTopRestaurants)

// Foods Available in 30 minutes
router.get('/foods-in-30-min/:pincode', GetFoodsIn30Min)

// Search Foods
router.get('/food/search/:pincode', SearchFoods)

// Find Restaurant by ID
router.get('/restaurant/:id', RestaurantById)


export { router as ShoppingRoute };