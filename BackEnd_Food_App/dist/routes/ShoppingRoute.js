"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const ShoppingController_1 = require("./../controllers/ShoppingController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.ShoppingRoute = router;
// Food Availability
router.get('/food/availability/:pincode', ShoppingController_1.GetFoodAvailability);
// Top Restaurants
router.get('/top-restaurants/:pincode', ShoppingController_1.GetTopRestaurants);
// Foods Available in 30 minutes
router.get('/foods-in-30-min/:pincode', ShoppingController_1.GetFoodsIn30Min);
// Search Foods
router.get('/food/search/:pincode', ShoppingController_1.SearchFoods);
// Find Restaurant by ID
router.get('/restaurant/:id', ShoppingController_1.RestaurantById);
//# sourceMappingURL=ShoppingRoute.js.map