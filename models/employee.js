const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    conformPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
