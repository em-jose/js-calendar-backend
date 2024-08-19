const { response } = require("express");

const loginUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: "login",
    });
};

const createNewUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: "register",
    });
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = { loginUser, createNewUser, renewToken };
