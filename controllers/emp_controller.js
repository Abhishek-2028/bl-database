const User = require("../model/emp_schema")
const Task =require("../model/Daily_update")


const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config({ path: './.env' })

const ADMIN_email = process.env.ADMIN_Email
const ADMIN_Pass = process.env.ADMIN_Pass



const emp_add = async (req, res) => {
    let data = new User({
        Fname: req.body.Fname,
        Mname: req.body.Mname,
        Lname: req.body.Mname,
        Gender: req.body.Gender,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
        DOB: req.body.DOB,
        Designation: req.body.Designation,
        Address: req.body.Address,
        Salary: req.body.Salary
    });
    console.log(req.body)
    let demo1 = await data.save();
    res.send(demo1)
    conf_user_email(req.body)

}

const emp_show = async (req, res) => {
    let userData = await User.find();
    res.send(userData);
}

const emp_del = async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    res.json(data)
}

const emp_update = async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        });

    res.json(data)
}



const conf_user_email = async (emp) => {

    let transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        requireTLS: 'true',
        auth: {
            user: ADMIN_email,
            pass: ADMIN_Pass
        }
    })

    transpoter.sendMail({
        from: ADMIN_email,
        to: emp.Email,
        subject: 'confirmation mail',
        html:`
        <div 
        style="
        border: 10px solid goldenrod;
        display: grid;
        padding: 20px 20px;
        textAlign: center;
        justifyContent: center;
        width: auto
      "
    >
      <div
        style="
          background: white;
          display: flex;
          justifyContent: center;
          padding: 10px;
          width: 600px;
          boxShadow: 2px 2px 2px 4px  rgb(8,8,8,0.15)
        "
      >
        <div>
          <img
          style="
          height:40px"
            src=https://www.bluesoft.live/images/logo-1.png 
          />
        </div>
        <div style="fontsize: 40px; marginleft: 10px; margintop:6px">
          Bluesoft Infotech
        </div>
      </div>
      <br />
      <div>
        <img
          src=https://media3.giphy.com/media/igsRPcwi7yoNjEgEOw/giphy.gif?cid=790b7611f7efa60c3129553d8f80aad11e873da583c96c2d&rid=giphy.gif&ct=g
          height=90px
          width=200px
        >
      </div>
 
      <h1
        style="
          borderBottom: 3.5px solid Black;
          paddingBottom: 5px;
          color:blue;
          fontFamily:Gabriola
        "
      >
        ${emp.Fname} ${emp.Mname} ${emp.Lname}
      </h1>
      <p style="marginTop:-5px;fontSize:20px">
        You have been an esteemed member of <b>Bluesoft Infotech</b>
      </p>
      <div
        style="
          boxShadow: 1px 1px 4px 6px  rgb(8,8,8,0.35);
          background: khaki;
          width:550px;
          height:170px;
          marginLeft:35px
        "
      >
        <h1>Your Employee Login Credential</h1>
        
        <h4 style=" color: red;margin:-20px;textAlign:left;marginLeft:40px;
          border: 1px solid black;width:450px;padding:10px
      ">
           Register Email :  ${emp.Email}
          <br />
          <br />
          New Password : ${emp.Password}
        </h4>
      </div>
    </div>

        `
      
    }).then(() => { console.log('mail send') })
}

const update_sal = async (req, res) => {
    let data1 = await User.findOne()
    console.log("data1", data1.Salary);
    let data = new emp_salary({ Salary: req.body.Salary });
    console.log(req.body)
    let demo1 = await data.save();
    res.send(demo1)
}

const task_post = async(req,res)=>{
    let task=new Task(req.body)
    let tasks_added= await task.save();
    res.send(tasks_added)
}

const task_get =async(req,res)=>{
    let showtask= await Task.find();
    res.send(showtask)
}

const task_del =async(req,res)=>{
    const taskdel=await Task.findByIdAndDelete(req.params.id);
    res.json(taskdel)
}

module.exports = {
    emp_add,
    emp_del,
    emp_show,
    emp_update,
    conf_user_email,
    role_update,
    update_sal,
    task_post,
    task_get,
    task_del
}