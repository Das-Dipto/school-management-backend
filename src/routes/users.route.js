const {
  registration,
  loginUser,
  userInfo,
  verifyJsonWebToken,
} = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", loginUser);
router.get("/userInfo", verifyJsonWebToken, userInfo);

module.exports = router;
