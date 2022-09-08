const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer")
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

var DocSchema = new mongoose.Schema({
    Doc_name: {
        type: String,
     
    },
    Doc_img: {
        type: String,
        
    }
});

var document = mongoose.model("document", DocSchema);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
       
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    
});


app.use('/user_docs', express.static('uploads'));
app.post("/doc_upload", upload.single('user_docs'), (req, res) => {

    var final_img = new document({
      
        Doc_name: req.body.Doc_name,
        
        Doc_img: `http://localhost:5555/user_file/${req.file.originalname}`,

        emp_doc_id: {
            type:String,
            required:true
        }
   
    });
    final_img
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(`Error: ${err}`))
   

    console.log(req.file);

})

app.get('/getdocs', function (req, res) {
    document.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


app.use('/user_file', express.static('uploads'));

const routes = require("./routes/routes");

app.use("/emp",routes);

app.listen(port,()=>console.log(`server is running on port ${port}`))   