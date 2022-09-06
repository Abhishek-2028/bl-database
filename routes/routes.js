const router = require("express").Router()
const emp_controller= require("../controllers/emp_controller")

router.post("/emp-post",emp_controller.emp_add)
router.post("/upd_sal/:id",emp_controller.update_sal)
router.get("/emp-get",emp_controller.emp_show)
router.delete("/emp-del/:id",emp_controller.emp_del)
router.put("/emp-update/:id",emp_controller.emp_update)
router.put("/role-update/:id",emp_controller.role_update)
router.post("/task-post",emp_controller.task_post)
router.get("/task-get",emp_controller.task_get)
router.delete("/task-del/:id",emp_controller.task_del)


module.exports = router;