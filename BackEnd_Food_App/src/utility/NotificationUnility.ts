// Email

//Notification

//OTP

export const GenerateOtp = () => {

    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30* 60 * 1000)) // 30 mins

    return { otp, expiry }

}

export const onRequestOTP = async( otp: number, toPhoneNumber: string ) => {

    const accountSid = "ACea1949cde3f0980830dbcb46c0347a7c";

    const authToken = "1d534cf098ce7ab340f93496e26a9dc4";
    
    const client = require('twilio')(accountSid,authToken);

    const respons = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+18285225784',
        to: `+84${toPhoneNumber}`
    })

    return respons;
}


//Payment notification or emails