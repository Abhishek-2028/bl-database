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
        Lname: req.body.Lname,
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
       <div style="
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border: 10px solid goldenrod;
  padding: 20px 20px;
  "
>
  <div style="
              width: 100%;
              box-shadow: 2px 2px 2px 4px  rgb(8,8,8,0.15)
        ">
    <div style="
                margin: auto;
                display: flex;
                padding-left:22.5%;"
         >
      <img style="
          height:30px;" src="https://www.bluesoft.live/images/logo-1.png" />
      <div style="margin-top:-22.5px">
        <h1>Bluesoft Infotech</h1>
      </div>
    </div>
  </div><br>
    <div style="text-align:center">
      <img src="https://media3.giphy.com/media/igsRPcwi7yoNjEgEOw/giphy.gif?cid=790b7611f7efa60c3129553d8f80aad11e873da583c96c2d&rid=giphy.gif&ct=g" height="100px" width="80%">
    </div>

    <h1 style="
          border-bottom: 3.5px solid Black;
          padding-bottom: 5px;
          color:blue;
          font-family:Gabriola;
          text-align:center
        ">
      ${emp.Fname} ${emp.Mname} ${emp.Lname}
    </h1>
    <p style="margin-top:-5px;font-size:20px">
      You have been an esteemed member of <b>Bluesoft Infotech</b>
    </p>
    <div style="
          box-shadow: 1px 1px 4px 6px  rgb(8,8,8,0.35);
          background: khaki;
          height:170px;
          text-align:center;
        ">
      <h1>Your Employee Login Credential</h1>
      <br>
      <h4 style=" color: red;
                   margin:-20px;
                   text-align:left;
                   margin-left:8%;
                   border: 1px solid black;
                   width:80%;
                   padding:10px
      ">
        Register Email : ${emp.Email}
        <br />
        <br />
        New Password : ${emp.Password}
      </h4>
    </div>
</div>

        `
      
    }).then(() => { console.log('mail send') })
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
    task_post,
    task_get,
    task_del
}