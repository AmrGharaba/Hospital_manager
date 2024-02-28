const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: [true, "age is required"],
        min: [1, "age must not be less than 1 year"],
        max: [140, "age must not exceed 140 years"]
    },
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: [2, "name must be 2 characters in length"],
        maxlength: [40, "name must not exceed 40 characters"]
    },
    symptoms: {
        type: String,
        required: [true, "symptoms are required"],
        minlength: [4, "Symptoms must atleast be 4 characters long"],

    }



}, { timestamps: true }
);

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;
