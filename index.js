const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port=process.env.PORT || 5555;
const dotenv=require("dotenv")


dotenv.config({ path : './.env'})

const DB=process.env.DTB;

mongoose.connect(DB)
   
    .then((data) => console.log(`mongodb connected with server: ${data.connection.host}`))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

// var DocSchema = new mongoose.Schema({
//     Doc_name: {
//         type: String,
//         required: true
     
//     },
//     Doc_img: {
//         type: String,
//         required: true
        
//     },
//     emp_doc_id:{
//         type: String,
//         required: true
//     }

// });

// var document = mongoose.model("document", DocSchema);




app.use('/user_docs', express.static('uploads'));
// app.post("/doc_upload/:id", upload.single('user_docs'), (req, res) => {

//     var final_img = new document({
      
//         Doc_name: req.body.Doc_name,
        
//         Doc_img: `http://localhost:5555/user_file/${req.file.originalname}`,

//         emp_doc_id: req.params.id
   
//     });
//     final_img
//         .save()
//         .then((data) => res.json(data))
//         .catch((err) => res.status(400).json(`Error: ${err}`))
   

//     console.log(req.file);

// })

// app.get('/getdocs', function (req, res) {
//     document.find({}, function (err, result) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });


app.use('/user_file', express.static('uploads'));

const routes = require("./routes/routes");

app.use("/emp",routes);

app.listen(port,()=>console.log(`server is running on port ${port}`))   