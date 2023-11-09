//importing student model

const Student = require('../models/student');



const student_login_get = (req, res) => {
       res.render("student/login");
    };

const student_login_post = async (req, res) => {
    
    try{
        const Sturoll = req.body.roll;   
        const individualStudent = await Student.findOne({roll : Sturoll});
        const date1 = individualStudent.dob;
        if(date1 === req.body.dob)
        {
            res.render("student/view",{one:individualStudent});
        }
        else{
            //res.render("student/login",{error:"incoorect"});
            req.flash('message', 'Incorrect DOB');
            res.send(req.flash('message'));
            

        }


    }
    catch(error){
        req.flash('error','Incorrect credentials');
        res.send(req.flash('error'));
    }
    }; 

//exporting student controller functions
module.exports={
    student_login_get,
    student_login_post
}