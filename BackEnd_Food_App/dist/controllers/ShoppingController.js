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
exports.RestaurantById = exports.SearchFoods = exports.GetFoodsIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
        .sort([['rating', 'descending']])
        .populate("foods"); // Obj Foods in Vandors
    const result_food = yield models_1.Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
        .populate("foods"); // Obj Foods in Vandors
    if (result.length > 0) {
        let foodResult = [];
        result_food.map(vandor => {
            const foods = vandor.foods;
            foodResult.push(...foods.filter(food => food.readyTime <= 30)); // GET FOOD 30 MINS <
        });
        return res.status(200).json({ "categories": [{ "id": 1, "title": "Burgers", "icon": "https://online-foods.herokuapp.com/images/burger.jpg" }, { "id": 2, "title": "Pizzas", "icon": "https://online-foods.herokuapp.com/images/pizzas.jpg" }, { "id": 3, "title": "Coffee", "icon": "https://online-foods.herokuapp.com/images/coffee.jpg" }, { "id": 4, "title": "Meals", "icon": "https://online-foods.herokuapp.com/images/meals.jpg" }], restaurants: result, foods: foodResult });
    }
    return res.status(400).json({ message: 'Data not Found!' });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
        .sort([['rating', 'descending']])
        .limit(10);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: 'Data not Found!' });
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodsIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
        .populate("foods"); // Obj Foods in Vandors
    if (result.length > 0) {
        let foodResult = [];
        result.map(vandor => {
            const foods = vandor.foods;
            foodResult.push(...foods.filter(food => food.readyTime <= 30)); // GET FOOD 30 MINS <
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: 'Data Not Found!' });
});
exports.GetFoodsIn30Min = GetFoodsIn30Min;
const SearchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode; // >1000 must using cache
    const result = yield models_1.Vandor.find({ pincode: pincode, serviceAvailable: true }) // serviceAvailable check Restaurant open not
        .populate("foods"); // Obj Foods in Vandors
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: 'Data Not Found!' });
});
exports.SearchFoods = SearchFoods;
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vandor.findById(id)
        .populate("foods"); // Obj Foods in Vandors
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: 'Data Not Found!' });
});
exports.RestaurantById = RestaurantById;
//# sourceMappingURL=ShoppingController.js.map