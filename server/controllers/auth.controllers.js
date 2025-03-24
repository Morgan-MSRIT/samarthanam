const User=require("../models/user.models");
const OTP=require("../models/opt.models");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mailSender=require('../utils/mailSender');
require("dotenv").config();
const otpGenerator=require("otp-generator");
// const {passwordUpdated}=require("../mail/templates/passwordUpdate");
// const welcomeTemplate = require("../mail/templates/newJoining");



// Sending welcome msg to the user
// async function sendJoiningEmail(email,name){
//     try{
//         const mailResponse=await mailSender(email,"Verification Email from Samatharan", welcomeTemplate(name));
//     }
//     catch(error){
//         console.log("Error occured while sending mails:",error);
//         throw error;
//     }
// }


exports.sendotp=async(req,res)=>{
    try{
        const {email}=req.body;
        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(415).json({
                success:false,
                message:"user already registered"
            })
        }

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        let result=await OTP.findOne({otp:otp});
        
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result=await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            message:"otp sent successfully"
        })
    }
    catch(error){
        console.log("Error while sending the otp:",error);
        return res.status(500)({
            success:false,
            message:error.message
        })
    }
}



exports.signup=async(req,res)=>{
    try{
        const {
            name,
            age,
            email,
            password,
            confirmPassword,
            phone,
            address,
            nationality,
            emailNotifAllow,
            role,
            tags,
            otp
        }=req.body;

        console.log(req.body)
        


        // if(!name || !password || !confirmPassword || !email || !age || !phone || !otp || !address || !nationality || !role || !tags || !emailNotifAllow){
        //     return res.status(403).json({
        //         success:false,
        //         message:"All fields are required!!"
        //     })
        // }


        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password value do not match, try again please "
            })
        }


        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered with this email"
            })
        }

        

        // const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        
        // console.log(recentOtp)
        // if(recentOtp.length==0){
        //     return res.status(400).json({
        //         success:false,
        //         message:"OTP NOT FOUND"
        //     })
        // }


        // else if(otp!==recentOtp[0].otp){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Invalid otp"
        //     })
        // }

        const hashedPassword=await bcrypt.hash(password,10);



        const user=await User.create({
            name,
            age,
            email,
            password: hashedPassword,
            phone,
            address,
            nationality,
            emailNotifAllow,
            role,
            tags,
            });
            

            // sendJoiningEmail(email,user.name);


            
        return res.status(200).json({
            success:true,
            message:"Sign up Successfull",
            user
        })
    }
    catch(error){
        console.log("Error in signing up:",error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,please try again"
        })
    }
}


//login
exports.login=async(req,res)=>{
    try{
      //get data
      const {email,password}=req.body;
      //validate data
      if(!email || !password){
        return res.status(403).json({
          success:false,
          message:"All fields are required,please try again"
        })
      }

      //newly made ccount of the organizer
      const defaultPassword=await bcrypt.hash("abcdefghijk",10);

      if(password===defaultPassword){
        return res.status(415).json({
            success:false,
            message:"This is newly made account for the organizer, Please change your password"
        })
    }


  
      //check if user exists or not
      const user=await User.findOne({email});
      if(!user){
        return res.status(415).json({
          success:false,
          message:"User does not exist, Sign up first please"
        })
      }
  
      //password Check
      if(await bcrypt.compare(password,user.password)){
        const payload={
          email:user.email,
          id:user._id,
          accountType:user.accountType,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"1d",
        })
        user.token=token;
        user.password=undefined;
  
         //create cookie and send response
        const options={
          expires:new Date(Date.now()+3*60*60*1000),
          httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"Logged in successfully"
        })
      }
  
      else{
        return res.status(415).json({
          success:false,
          message:"Password is incorrect"
        })
      }
  
  
     
    } 
    catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Login Failure, please try again"
      })
    }
  }
  
exports.organizerChangePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword,userId, otp}=req.body;
        const uid=userId || req.user.id;

        const userDetails=await User.findById(uid);

        const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);
        if(!isPasswordMatch){
            return res.status(415).json({
                success:false,
                message:"The password is incorrect"
            })
        }


        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP NOT FOUND"
            })
        }

        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            })
        }

        const encryptedPassword=await bcrypt.hash(newPassword,10);
        const updatedUserDetails=await User.findByIdAndUpdate(
            uid,
            {password:encryptedPassword},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    }
    catch(error){
        console.log("Error occurred while updating password:",error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating password",
            error:error.message
        })
    }
}




exports.changePassword=async(req,res)=>{

  try {
        const { oldPassword, newPassword,userId} = req.body;
        const uid=userId || req.user.id;
         
        const userDetails = await User.findById(uid);
   
       

    //Validation
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
        
            return res
                .status(415)
                .json({ success: false, message: "The password is incorrect" });
        }


    //Hashing and updating    
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            uid,
            { password: encryptedPassword },
            { new: true }
        );

    
    //Send mail
        // try {
        //     const emailResponse = await mailSender(
        //         updatedUserDetails.email,
        //         passwordUpdated(
        //             updatedUserDetails.email,
        //             `Password updated successfully for ${updatedUserDetails.name}`
        //         )
        //     );
        // } catch (error) {
            
        //     console.error("Error occurred while sending email:", error);
        //     return res.status(500).json({
        //         success: false,
        //         message: "Error occurred while sending email",
        //         error: error.message,
        //     });
        // }

        
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}



exports.organizerSignup=async(req,res)=>{
    try{
        const {
            name,
            age,
            email,
            password,
            phone,
            address,
            nationality,
            emailNotifAllow,
            role,
            tags
        }=req.body;
        


        if(!name || !password || !email || !age || !phone || !address || !nationality || !role || !tags || !emailNotifAllow){
            return res.status(403).json({
                success:false,
                message:"All fields are required!!"
            })
        }


        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered with this email"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);



        const user=await User.create({
            name,
            age,
            email,
            password,
            confirmPassword,
            phone,
            address,
            nationality,
            emailNotifAllow,
            role,
            tags,
            });
            

            // sendAccountMadeEmail(email,user.name);


            
        return res.status(200).json({
            success:true,
            message:"Sign up Successfull",
            user
        })
    }
    catch(error){
        console.log("Error in signing up:",error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,please try again"
        })
    }
}
