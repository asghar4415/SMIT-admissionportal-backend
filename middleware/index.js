import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";
import otpModel from "../models/otpSchema.js";

export const verifyTokenMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
   
    if (!token) {
      console.log("token not found");
      return res.status(400).json({
        message: "UnAuth User",
        status: false,
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//      console.log(decoded);
//     const isOtpVerified = await otpModel.findOne({userId: decoded?.cnic});
// console.log(isOtpVerified)
//     if (!isOtpVerified?.verified) {
      
//       return res.json({
//         message: "user_unverified",
//         status: false,
//         email: decoded.email
//       });
//     }

    req.userCnic = decoded?.cnic;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("unAuth User");
  }
};
