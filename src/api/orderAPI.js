const express = require("express");
const orderController = require("../controller/orderController");
const auth = require("../controller/auth");
const router = express.Router();

router.get("/admin/all", auth.authenticate, orderController.getAllOrderAsAdmin);
router.get("/user/all", auth.authenticate, orderController.getAllOrderAsUser);
router.get("/:order_id", auth.authenticate, orderController.getSpecificOrder);
router.post("/create", auth.authenticate, orderController.createOrder);
router.patch("/:order_id", orderController.updateOrder);
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;
