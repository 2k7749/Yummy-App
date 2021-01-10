import { AvailabilityAction } from './../actions/shoppingAction';
import { LocationGeocodedAddress } from 'expo-location';

//Export Category

export interface Category{

    id: string,
    title: String,
    icon: String

}

//Food Mode
export interface FoodModel{

    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    readyTime: number;
    images: [string];
    unit: number;

}

//Restaurant Models
export interface Restaurant{

    _id: string;
    name: string;
    foodType: string;
    address: string;
    phone: string;
    images: string;
    foods: [FoodModel];

}

export interface FoodAvailability{

    categories: [Category];
    restaurants: [Restaurant];
    foods: [FoodModel];

}

//todo : Modify later
//User Models
export interface UserModel{

    email: string;
    signature: string;
    verified: boolean;

}

export interface UserState{

    user: UserModel;
    location: LocationGeocodedAddress;
    error: string | undefined;
    Cart: [FoodModel]
    Order: [OrderState];

}

export interface ShoppingState{

    availability: FoodAvailability,
    availableFoods: [FoodModel]
    //other models
    
}

export interface OrderState{
    _id: string,
    orderID: string,
    items: [FoodModel],
    totalAmount: number,
    orderDate: string,
    paidThrough: string,
    paymentResponse: string, 
    orderStatus: string
}