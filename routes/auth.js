/* 
    User routes / Auth routes
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { fieldValidate } = require("../middlewares/field-validator");
const { loginUser, createNewUser, renewToken } = require("../controllers/auth");
const { jwtValidate } = require("../middlewares/jwt-validator");

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
        fieldValidate,
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
        fieldValidate,
    ],
    createNewUser
);
router.get("/renew", jwtValidate, renewToken);

module.exports = router;
