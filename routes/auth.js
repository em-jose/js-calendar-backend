/* 
    User routes / Auth routes
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();

const { loginUser, createNewUser, renewToken } = require("../controllers/auth");

router.post("/", loginUser);
router.post("/new", createNewUser);
router.get("/renew", renewToken);

module.exports = router;
