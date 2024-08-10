import mongoose from "mongoose";


const appliedCourses = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseBatch:{
        type:Number,
        required:true
    },
    courseRegion:{
        type:String,
        required:true
    },
    courseDeadline:{
        type:Date,
        required:true
    },
    courseTestDate:{
        type:Date,
        required:true
    },
    courseResult:{
        type:Boolean,
        default:false
    },
    courseMarks:{
        type:Number,
        default:0
    }


})

const userSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    cnic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    city: {
        type: String,
    },
    phone: {
        type: String,
    },
   
    date_of_birth: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    lastQualification: {
        type: String,
    },
    laptop: {
        type: Boolean,
    },
    coursesApplied:{
        type:[appliedCourses],
        required:false
    },
    img:{
        type:[String],
        required:false
    }

});

const userModel = mongoose.model("user", userSchema);
export default userModel;