const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidate = (req, res = response, next) => {
    // x-token headers
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Token is required",
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token not valid",
        });
    }

    next();
};

module.exports = {
    jwtValidate,
};
