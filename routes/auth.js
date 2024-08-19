/* 
    User routes / Auth routes
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { loginUser, createNewUser, renewToken } = require("../controllers/auth");

router.post(
    "/",
    [
        check("email", "Email is required").not().isEmpty(),
        check("email", "Email format is not correct").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check(
            "password",
            "Password must contain at least 6 characters"
        ).isLength({ min: 6 }),
    ],
    loginUser
);
router.post(
    "/new",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("email", "Email format is not correct").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check(
            "password",
            "Password must contain at least 6 characters"
        ).isLength({ min: 6 }),
    ],
    createNewUser
);
router.get("/renew", renewToken);

module.exports = router;
