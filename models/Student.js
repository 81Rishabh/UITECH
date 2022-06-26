const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  batch: {
    type : Date,
    required: true,
  },
  collage: {
    type: String,
  },
  isPlaced: {
    type: Boolean,
    require: true,
  },
  scores: 
    {
      dsa_score: {
        type: Number,
        default: 0,
      },
      web_dev_score: {
        type: Number,
        default: 0,
      },
      reactjs_score: {
        type: Number,
        default: 0,
      },
    },
  interview : {
    company : {
        type : String,
    },
    interview_date : {
        type : Date
    }
  },
  result : {
    type : String,
    require : true
  }
});

const Student = mongoose.model('student' , studentSchema);
module.exports  = Student;