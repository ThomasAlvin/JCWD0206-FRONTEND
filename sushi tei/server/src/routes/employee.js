const express = require("express");
const router = express.Router();
const employeeController = require("../controllers").employeeController;

router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.post("/v1", employeeController.insertEmployee);
router.patch("/v2/:id", employeeController.editEmployee);
router.delete("/v3/:id", employeeController.deleteEmployee);

module.exports = router;
