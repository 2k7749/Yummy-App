"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const AdminController_1 = require("./../controllers/AdminController");
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.AdminRoute = router;
router.post('/vandor', controllers_1.CreateVandor);
router.get('/vandors', AdminController_1.GetVandors);
router.get('/vandor/:id', AdminController_1.GetVandorByID);
router.get('/', (req, res, next) => {
    res.json({ message: ' Hello from Admin' });
});
//# sourceMappingURL=AdminRoute.js.map