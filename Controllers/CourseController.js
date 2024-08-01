import courseModel from "../models/coursesSchema.js";


// export const addCourseController = async (req, res) => {
//   const { course_name, batch, students_enrolled, deadline, region } = req.body;

//   if (!course_name || !batch || !students_enrolled || !deadline || !region) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     const newCourse = new courseModel({
//       course_name,
//       batch,
//       students_enrolled,
//       deadline,
//       region,
//     });

//     await newCourse.save();
//     res
//       .status(201)
//       .json({ message: "Course added successfully.", course: newCourse });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add course." });
//   }
// };

export const enrollIntoCourse = async (req, res) => {
    const { cnic, email, courseId } = req.body;

    if (!cnic || !email || !courseId) {
        return res.status(400).json({
            data: null,
            status: false,
            message: "Required fields are missing",
        });
    }

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                data: null,
                status: false,
                message: "Course not found",
            });
        }

        if (!course.students_enrolled.includes(cnic)) {
            course.students_enrolled.push(cnic);
            await course.save();
        }

        res.status(200).json({
            data: course,
            status: true,
            message: "Student enrolled successfully",
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            status: false,
            message: "Failed to enroll student",
        });
    }
};

export const viewEnrolledCourses = async (req, res) => {
    const { cnic } = req.query;

    if (!cnic) {
        return res.status(400).json({
            data: null,
            status: false,
            message: "CNIC is required",
        });
    }

    try {
        const courses = await courseModel.find({ students_enrolled: cnic });
        res.status(200).json({
            data: courses,
            status: true,
            message: "Enrolled courses fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            status: false,
            message: "Failed to fetch enrolled courses",
        });
    }
};


export const viewCourses = async (req, res) => {
  try {
    const now = new Date();
    const courses = await courseModel.find();
    const availCourses = courses.filter(
      (course) => new Date(course.deadline) > now
    );
    res.status(200).json(availCourses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses." });
  }
};

export const viewCoursebyID = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    const now = new Date();
    if (new Date(course.deadline) <= now) {
      return res.status(400).json({ error: "Course deadline has passed." });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course." });
  }
};

// export const editCourse = async (req, res) => {
//   const { id } = req.params;
//   const { course_name, batch, students_enrolled, deadline, region } = req.body;

//   try {
//     const course = await courseModel.findByIdAndUpdate(
//       id,
//       {
//         course_name,
//         batch,
//         students_enrolled,
//         deadline,
//         region,
//       },
//       { new: true }
//     );

//     if (!course) {
//       return res.status(404).json({ error: "Course not found." });
//     }

//     res.status(200).json({ message: "Course updated successfully.", course });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update course." });
//   }
// };



//update user details this will be form after login

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

export const getUserData =async (req, res) => {
  const { email } = req.query;

  if (!email) {
      return res.status(400).json({ error: "Email is required." });
  }

  try {
      const user = await userModel.findOne({ email });

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: "Failed to get user data." });
  }
}

// export const deleteCourse = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const course = await courseModel.findByIdAndDelete(id);

//     if (!course) {
//       return res.status(404).json({ error: "Course not found." });
//     }

//     res.status(200).json({ message: "Course deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete course." });
//   }
// };