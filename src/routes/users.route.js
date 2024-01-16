const { registration } = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/registration", registration);

module.exports = router;
