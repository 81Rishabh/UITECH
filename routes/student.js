const express = require("express");
const router = express.Router();
const studentController = require("../controller/StudentController");

// router for storing students detils
router.post('/create-students' , studentController.create);

// routes for download csv file
router.get('/download' , studentController.downlodeCSV);

module.exports = router;