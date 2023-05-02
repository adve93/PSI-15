const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.get('/', function(req, res, next) {
    res.send('user');
  });

router.get("/list", user_controller.user_list);

router.post("/create", user_controller.user_create_post);

router.post("/update/:username", user_controller.user_update_post);

router.get("/:username", user_controller.user_detail);


router.get("/delete/:username", user_controller.user_delete_get);

module.exports = router;