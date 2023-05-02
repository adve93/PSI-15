const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

router.get('/', function(req, res, next) {
    res.send('item');
  });

router.get("/list", item_controller.item_list);

router.post("/create", item_controller.item_create_post);

router.post("/update/:title", item_controller.item_update_post);

router.get("/:title", item_controller.item_detail);

router.get("/delete/:title", item_controller.item_delete_get);

module.exports = router;