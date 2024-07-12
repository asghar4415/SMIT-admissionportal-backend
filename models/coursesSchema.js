import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const batchSchema = new mongoose.Schema({
    batch_id: {
        type: Number,
        required: true
    },
    students_enrolled: {
        type: [studentSchema],
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

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    batch: {
        type: [batchSchema],
        required: true
    }
    
});

module.exports = mongoose.model('Course', courseSchema);
