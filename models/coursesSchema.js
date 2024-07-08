import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    students_enrolled: {
        type: [String],
        required: true
    },
    deadline: {
        type: Date, 
        required: true
    },
    region: {
        type: String,
        required: true
    },
    test_date: {
        type: String,
        default: null
    }
});

const courseModel = mongoose.model("course", courseSchema);
export default courseModel;