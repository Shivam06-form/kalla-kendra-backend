const mongoose = require("mongoose");
const resume = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name must be filled up"],
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, "Middle name must be filled up"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name must be filled up"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "email must be filled up"],
  },
  phoneNo: {
    type: Number,
    trim: true,
    required: [true, "Phone number must be filled up"],
  },
  alternatePhNo: {
    type: Number,
    trim: true,
    required: [true, "Alternate phone number must be filled up"],
  },
  location: {
    type: String,
    trim: true,
    required: [true, "Location must be filled up"],
  },
  qualification: {
    type: String,
    trim: true,
    required: [true, "Qualifications must be filled up"],
  },
  board: {
    type: String,
    trim: true,
    required: [true, "Board must be filled up"],
  },
  university: {
    type: String,
    trim: true,
    required: [true, "University must be filled up"],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, "Age must be filled up"],
  },
  sex: {
    type: String,
    trim: true,
    required: [true, "Sex must be filled up"],
  },
  applicationType: {
    type: String,
    trim: true,
    required: [true, "Application Type must be filled up"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Occupation must be filled up"],
  },
  jobType: {
    type: String,
    trim: true,
    required: [true, "Job type must be filled up"],
  },
  yearOfExperience: {
    type: Number,
    trim: true,
    required: [true, "Year of experience must be filled up"],
  },
});

module.exports = mongoose.model("Resume", resume);
