import otpModel from "../models/otpSchema.js";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import 'dotenv/config';
import { EmailVerificationHtml } from "../template/index.js";

export const otpProcess = async (userId, email) => {

  await otpModel.deleteMany({userId:email});
  const generatedOtp = crypto.randomInt(100000, 999999).toString();
  await otpModel.create({ otp: generatedOtp, userId:email });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  return transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    html: EmailVerificationHtml(generatedOtp),
  });
};


export const userOtpVerified = async(req,res)=>{
  
  const email =req.params.email
// console.log(email)  
  const otpuser = await otpModel.findOne({userId:email})
 
  if(otpuser?.verified){
    res.json(
      {
        data:null,
        message:"user already verified",
        status:true
      }
    )
    return
  }
  res.json(
    {
      data:null,
      message:"user not verified",
      status:false
    }
  )
  
}
export const otpProcessApi = async (req,res) => {
  const email =req.body.email
  const otpuser = await otpModel.deleteMany({userId:email})

  const generatedOtp = crypto.randomInt(100000, 999999).toString();
  await otpModel.create({ otp: generatedOtp, userId:email });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

   transporter.sendMail({
    from: process.env.EMAIL,

    to: email,
    subject: "Email Verification",
    html: EmailVerificationHtml(generatedOtp),
  });
  
  res.json("resend successful")
};

const signupController = async (req, res) => {
  try {
    const { name, email, password,cnic} = req.body;

    if (!name || !email || !password || !cnic) {
      return res.status(400).json({
        data: null,
        status: false,
        message: "Required fields are missing"
      });
    }
    const userExist = await userModel.findOne({
      $or: [
        { email: email },
        { cnic: cnic }
      ]
    });


    if (userExist) {
      return res.json({
        data: null,
        message: "Email already exists",
        status: false
      });
    }

    const userCreated = await userModel.create({ fullName:name, email, password,cnic });

    

    res.json({
      data: null,
      message: "User created.",
      status: true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
};

const otpVerify = async (req, res) => {
  const { id, otp } = req.body;
  if (!id || !otp) {
    return res.status(400).json("req fields are missing");
  }

  let getOtp = await otpModel.findOne({userId:id});
  
  if (!getOtp) {
    return res.status(400).json({
      data: null,
      message: "OTP not found",
      status: false,
    });
  }

  if (getOtp.otp !== otp) {
    return res.json({
      data: null,
      message: "wrong otp code entered",
      status: false,
    });
  }

  getOtp.verified = true;
  await getOtp.save();

  res.json({
    data: getOtp,
    message: "OTP verified successfully",
    status: true,
  });

};


const loginController = async (req, res) => {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    return res.json({
      data: null,
      status: false,
      message: "Required fields are missing"
    });
  }

  const userExist = await userModel.findOne({
    $or: [
      { cnic: cnic }
    ]

  });



  if (!userExist) {
    console.log("User does not exist");
    return res.status(400).json({
      data: null,
      status: false,
      message: "CNIC does not exist"
    });
  }

  if (userExist.password != password) {
    return res.status(400).json({
      data: null,
      status: false,
      message: "Password incorrect"
    });
  }
  const tokenkey= process.env.TOKEN_KEY;
  const token = jwt.sign({cnic:userExist.cnic}, tokenkey, {
    expiresIn: '2hr',
  });   
  

  res.json({
    data: userExist,
    token,
    status: true
  });
};



const verifyController = async (req, res) => {
  res.json("user verified")
};

const getStdDetails =async(req,res)=>{
    const {cnic} = req.params

    const userDetails = await userModel.findOne({cnic})
    res.json(userDetails)
    
}

export {
  signupController,
  loginController,
  verifyController as verify,
  otpVerify,
  getStdDetails,
  
};  