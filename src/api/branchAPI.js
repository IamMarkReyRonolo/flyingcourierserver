const express = require("express");
const auth = require("../controller/auth");
const branchController = require("../controller/branchController");
const router = express.Router();

router.get("/all", branchController.getAllBranch);

router.get("/:branch_id", branchController.getSpecificBranch);

router.post("/create", auth.authenticate, branchController.createBranch);

router.patch("/:branch_id", branchController.updateBranch);

router.delete("/:branch_id", branchController.deleteBranch);

module.exports = router;
