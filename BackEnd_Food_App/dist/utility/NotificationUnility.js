"use strict";
// Email
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
exports.onRequestOTP = exports.GenerateOtp = void 0;
//Notification
//OTP
const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000)); // 30 mins
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = "ACea1949cde3f0980830dbcb46c0347a7c";
    const authToken = "1d534cf098ce7ab340f93496e26a9dc4";
    const client = require('twilio')(accountSid, authToken);
    const respons = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+18285225784',
        to: `+84${toPhoneNumber}`
    });
    return respons;
});
exports.onRequestOTP = onRequestOTP;
//Payment notification or emails
//# sourceMappingURL=NotificationUnility.js.map