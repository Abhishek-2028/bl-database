const mongoose = require("mongoose")
const validator = require("validator")

var empSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Mname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email'],
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Phone2: {
        type: Number
    },
    DOB: {
        type: Date,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Joindate: {
        type: Date,
        default: Date.now()
    },
    Address: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Salary: {
        salary:{
            type: Number,
            required: true
        },
        date:{
           type:Date,
           default: Date.now()
        }
    }
       ,
    role: {
        type: String,
        default: "Active"
    }
});




module.exports = mongoose.model("user_details", empSchema);