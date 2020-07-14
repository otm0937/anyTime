const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/schedule", require("./schedule"));

router.use("/alarm", require("./alarm"));

router.get("/main", (req, res) => {
    res.render("main");
});

module.exports = router;
