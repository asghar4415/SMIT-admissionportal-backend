import express from "express";
import {
  getStdDetails,
  loginController,
  otpProcessApi,
  otpVerify,
  signupController,
  verify,
} from "../Controllers/authController.js";
import upload from "../utils/multer.js";
import { UploadImage } from "../Controllers/postController.js";
import { verifyTokenMiddleware } from "../middleware/index.js";

import {
  viewCoursebyID,
  viewCourses,
  studentDetails,
  getUserData,
  viewEnrolledCourses,
} from "../Controllers/CourseController.js";

const router = express.Router();

router.post("/api/auth/register", signupController);
router.post("/api/auth/login", loginController);
router.post("/api/verifyotp", otpVerify);

router.get("/get-std-details",)
router.post("/update-student-details", verifyTokenMiddleware, studentDetails);
router.post("/api/auth/resend-otp", otpProcessApi);
router.post(
  "/api/uploadimage",
  upload.any("image"),
  UploadImage
);

router.get("/getUserData/:cnic", getStdDetails);

router.get("/api/course/enrolled-courses", viewEnrolledCourses);

router.get("/api/course/view", viewCourses);
router.get("/api/course/view:id", viewCoursebyID);
router.get("/api/auth/verify", verifyTokenMiddleware, verify);


export default router;