const express = require("express");
const router = express.Router();

const client_controller = require("../controllers/clientController");

router.get('/', function(req, res, next) {
    res.send('client');
  });

router.get("/list", client_controller.client_list);

router.get("/post", client_controller.client_create_post);

router.get("/:id", client_controller.client_detail);

module.exports = router;