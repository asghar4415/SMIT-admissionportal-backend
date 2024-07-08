import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";
import otpModel from "../models/otpSchema.js";

export const verifyTokenMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    if (!token) {
      console.log("token not found");
      return res.status(400).json({
        message: "UnAuth User",
        status: false,
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const isOtpVerified = await otpModel.findOne({userId: decoded?.email});

    if (!isOtpVerified?.verified) {
      console.log("mae chala xd")
      return res.json({
        message: "user_unverified",
        status: false,
        email: decoded.email
      });
    }

    req.userEmail = decoded?.email;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json("unAuth User");
  }
};
