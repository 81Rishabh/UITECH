const Student = require("../models/Student");
const downloadResource = require('../config/downlodeResourse');


// controller for createing students details table
module.exports.create = async function (req, res) {
  const {
    username,
    email,
    batch,
    collage,
    isPlaced,
    dsa_score,
    web_dev_score,
    reactjs_score,
    company,
    interview_date,
    result,
  } = req.body;

  let dsaScore = parseInt(dsa_score);
  let webDScore = parseInt( web_dev_score);
  let reactjsScore = parseInt(reactjs_score);

  // convert date into LocalDatString 
  let date = new Date(batch); 
 
  try {
    await Student.create({
      username,
      email,
      batch : date.toDateString(),
      collage,
      isPlaced,
      scores : {
          dsa_score : dsaScore,
          web_dev_score : webDScore,
          reactjs_score : reactjsScore,
      },
      interview : {
         company,
         interview_date
      },
      result,
    });
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};


// controller for createing interview by mentor 
module.exports.createInterview = async function(req ,res) {
    const ID = req.params.id;
    let date = new Date(req.body.interview_date); 
 
    try {
      await Student.findByIdAndUpdate(ID , {
        interview : {
          company : req.body.company,
          interview_date : date.toDateString()
        }
      });
    
      return res.redirect("back");
    } catch (error) {
      return res.redirect("back");
    }
   
}

// controller for download csv file
module.exports.downlodeCSV = async function(req,res) {
    let students = await Student.find({});
   
    const fields = [
      {
        label: 'Name',
        value: 'username'
      },
      {
        label: 'Email',
        value: 'email'
      },
      {
       label: 'Collage',
        value: 'collage'
      }, 
       {
        label: 'Batch',
        value: 'batch'
      },
      {
        label: 'Placed',
        value: 'placed'
      },
      {
        label: 'DSA_Score',
        value: 'scores.dsa_score'
      }, 
       {
       label: 'Web_Dev_Score',
        value: 'scores.web_dev_score'
      }, 
       {
        label: 'Reactjs_Score',
        value: 'scores.reactjs_score'
       },
       {
        label: 'Result',
        value: 'result'
      },
    ];

    return downloadResource(res, 'students.csv', fields, students);
}