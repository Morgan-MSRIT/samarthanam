const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender');
const otpTemplate=require('../mail/templates/emailVerificationTemplate');


const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:20*60*1000,
    }
});

//this is a function to send emails
async function sendVerificationEmail(email,otp){
    try{
        console.log("-----------------");
        const mailResponse=await mailSender(email,"Verification Email from Samatharan",otpTemplate(otp));
        console.log("Mail response:",mailResponse);
    }
    catch(error){
        console.log("Error occured while sending mails:",error);
        throw error;
    }
}

//this is a pre save middleware for otp
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})


module.exports=mongoose.model("OTP",otpSchema);