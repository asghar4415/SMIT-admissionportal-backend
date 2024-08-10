import courseModel from "../models/coursesSchema.js";
import mockData from "../mock_data.js";

import userModel from "../models/userSchema.js";
import notificationModel from "../models/notificationSchema.js";
import notification from "../mock_notification.js";



export const enrollIntoCourse = async (req, res) => {
  const { cnic } = req.body;

  const courseDetails = {
    courseName: req.body.course_details.course_name,
    courseBatch: req.body.course_details.batch_id,
    courseDeadline: req.body.course_details.deadline,
    courseRegion: req.body.course_details.region,
    courseTestDate: req.body.course_details.test_date,
  };

  try {
    const student = await userModel.findOne({ cnic });

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Check if the course is already applied
    const courseExists = student.coursesApplied.some(
      (course) => 
        course.courseName === courseDetails.courseName &&
        course.courseBatch === courseDetails.courseBatch &&
        course.courseRegion === courseDetails.courseRegion
    );

    if (courseExists) {
      return res.status(400).json({ error: "Course already registered." });
    }

    const updatedStudent = await userModel.findOneAndUpdate(
      { cnic },
      { $push: { coursesApplied: courseDetails } },
      { new: true }
    );

    if (updatedStudent) {
      return res.status(200).json({ message: "Course enrolled successfully.", student: updatedStudent });
    } else {
      return res.status(500).json({ error: "Failed to enroll into course." });
    }

  } catch (error) {
    return res.status(500).json({ error: "Failed to enroll into course." });
  }
};




export const viewCourses = async (req, res) => {
  try {
    // const courses = await courseModel.find();
    const courses = mockData;


    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses." });
  }
};



export const studentDetails = async (req, res) => {
  const {
    email,
    city,
    fullName,
    fatherName,
    phone,
    cnic,
    father_cnic,
    date_of_birth,
    gender,
    address,
    lastQualification,
    laptop,
  } = req.body;

  if (
    !city ||
    !fullName ||
    !fatherName ||
    !email ||
    !phone ||
    !cnic ||
    !father_cnic ||
    !date_of_birth ||
    !gender ||
    !address ||
    !lastQualification ||
    laptop === undefined
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    await userModel.findOneAndUpdate(
      { email },
      {
        city,
        fullName,
        fatherName,
        phone,
        cnic,
        father_cnic,
        date_of_birth,
        gender,
        address,
        lastQualification,
        laptop,
      },
      { new: true }
    );

    res.status(200).json({ message: "User data updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user data." });
  }
}

export const getUserData = async (req, res) => {
  const { cnic } = req.query;

  if (!cnic) {
    return res.status(400).json({ error: "CNIC is required." });
  }

  try {
    const user = await userModel.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user data." });
  }
}

export const notificationHandler = async (req, res) => {
  try {

    const region = req.params.region.charAt(0).toUpperCase() + req.params.region.slice(1);
   
    const notifications = notification;
    const today = new Date();

    const coursesofsameregion = notifications.filter(notification => 
      notification.courseRegion === region &&
      new Date(notification.courseDeadline) > today
    );

    res.status(200).json(coursesofsameregion);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
}
export const notificationHandler2 = async (req, res) => {
  try {
    
    const cnic = req.params.cnic;

    const user = await userModel.findOne({ cnic });
    
    const region = user.city.charAt(0).toUpperCase() + user.city.slice(1);

    const today = new Date();
    
    const coursesofsameregion = notification.filter((notification) =>
      notification.courseRegion === region &&
      new Date(notification.courseDeadline) > today
    );

    res.status(200).json(coursesofsameregion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};
