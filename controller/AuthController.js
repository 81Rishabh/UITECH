const Employee = require('../models/employee');

module.exports.signIn = function (req, res) {
     res.render('signIn' , {title : 'Login'});
}

module.exports.signUp = function (req, res) {
     res.render('signUp' , {title : 'Register'});
}



// controller for create employee
module.exports.create = async function (req, res) {
    const {email} = req.body;
    try {
        const employee = await Employee.findOne({email : email});
        //  if user already exist otherwise create new
        if(employee) {
            console.log("Employee already exists..");
            return res.redirect('/employee/signUp');
        }
        
        // create new user
        try {
            await Employee.create(req.body); 
            return res.redirect('/employee/signIn');
        } catch (error) {
            console.log("Error in creating user" , error);
            return res.redirect('back');
        }
    
    } catch (error) {
        return res.redirect('back');
    }
}

// contorller for creating session s

module.exports.createSession = function(req , res) {
    return res.redirect('/');
}