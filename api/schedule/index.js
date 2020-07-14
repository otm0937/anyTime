const express = require("express");
const router = express.Router();
const ctrl = require("./schedule.ctrl");

router.get("/", ctrl.list);
router.get("/alarm", ctrl.alarmlist);
router.get("/new", ctrl.showCreatePage);
router.get("/:id", ctrl.checkId, ctrl.showUpdatePage);

router.post("/", ctrl.create);
router.put("/:id", ctrl.checkId, ctrl.update);
router.put("/:id/alarm", ctrl.checkId, ctrl.alarm);
router.delete("/:id", ctrl.checkId, ctrl.remove);

module.exports = router;
