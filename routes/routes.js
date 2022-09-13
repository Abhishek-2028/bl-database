const router = require("express").Router()
const emp_controller= require("../controllers/emp_controller")
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const multer = require("multer")
const dotenv = require("dotenv")


dotenv.config({ path: './.env' })

const DB = process.env.DTB


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${DB}/uploads/`)
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,

});

router.post("/emp-post",emp_controller.emp_add)
router.get("/emp-get",emp_controller.emp_show)
router.delete("/emp-del/:id",emp_controller.emp_del)
router.put("/emp-update/:id",emp_controller.emp_update)
router.post("/task-post/:id",emp_controller.task_post)
router.get("/task-get",emp_controller.task_get)
router.delete("/task-del/:id",emp_controller.task_del)
router.post("/emp-login",jsonParser,emp_controller.emp_login)
router.post("/doc_upload/:id", upload.single('user_docs'), emp_controller.docs_post)
router.get("/getdocs",emp_controller.docs_get)




module.exports = router;