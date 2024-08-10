import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notificationID:{
        type:Number,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    courseBatch:{
        type:Number,
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
})

const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;