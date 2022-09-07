const router = require("express").Router()
const emp_controller= require("../controllers/emp_controller")
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/emp-post",emp_controller.emp_add)
router.get("/emp-get",emp_controller.emp_show)
router.delete("/emp-del/:id",emp_controller.emp_del)
router.put("/emp-update/:id",emp_controller.emp_update)
router.post("/task-post",emp_controller.task_post)
router.get("/task-get",emp_controller.task_get)
router.delete("/task-del/:id",emp_controller.task_del)
router.post("/emp-login",jsonParser,emp_controller.emp_login)


module.exports = router;