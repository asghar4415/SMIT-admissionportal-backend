import express from "express";
import {
  getStdDetails,
  loginController,
  otpProcessApi,
  otpVerify,
  signupController,
  userOtpVerified,
  verify,
} from "../Controllers/authController.js";
import upload from "../utils/multer.js";
import { UploadImage } from "../Controllers/postController.js";
import { verifyTokenMiddleware } from "../middleware/index.js";

import {
  
  viewCourses,
  studentDetails,
  
  enrollIntoCourse,
  notificationHandler,
  notificationHandler2,
} from "../Controllers/CourseController.js";

const router = express.Router();

router.post("/auth/register", signupController);
router.post("/auth/login", loginController);
router.post("/verifyotp", otpVerify);

router.post("/update-student-details", verifyTokenMiddleware, studentDetails);
router.post("/auth/resend-otp", otpProcessApi);
router.post(
  "/uploadimage",
  upload.any("image"),
  UploadImage
);

router.get("/getUserData/:cnic", getStdDetails);
router.get("/userOtpVerified/:email",userOtpVerified)
router.post("/course/enroll", enrollIntoCourse);

router.get("/course/view", viewCourses);
router.get("/auth/verify", verifyTokenMiddleware, verify);

router.get("/notification/:region", notificationHandler);
router.get("/getnotification/:cnic", notificationHandler2);




export default router;