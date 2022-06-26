const Students = require('../models/Student');


module.exports.home = async function(req , res) {
    try {
        const students = await Students.find({});
        return res.render('Home', {title : 'Home' , students});
       
    } catch (error) {
        console.log("Error in fetching students");
        return res.redirect('back');
    }
}

