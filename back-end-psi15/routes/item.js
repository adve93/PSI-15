const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/itemController");

router.get("/", item_controller.item_list);

router.post("/create", item_controller.item_create_post);

router.get("/detail/:title", item_controller.item_detail);

router.get("/delete/:title", item_controller.item_delete_get);

router.get("/deleteId/:title", item_controller.item_deleteById_get);

module.exports = router;