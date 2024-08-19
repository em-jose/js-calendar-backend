const { response } = require("express");

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "login",
        email,
        password,
    });
};

const createNewUser = (req, res = response) => {
    const { name, email, password } = req.body;

    if (name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: "Name must be at least 5 characters long",
        });
    }

    res.status(201).json({
        ok: true,
        msg: "register",
        name,
        email,
        password,
    });
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = { loginUser, createNewUser, renewToken };
