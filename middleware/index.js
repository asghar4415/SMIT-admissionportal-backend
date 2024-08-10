import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";
import otpModel from "../models/otpSchema.js";

export const verifyTokenMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
   
    if (!token) {
      return res.status(400).json({
        message: "UnAuth User",
        status: false,
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.userCnic = decoded?.cnic;
    next();
  } catch (err) {
    res.status(401).json("unAuth User");
  }
};
