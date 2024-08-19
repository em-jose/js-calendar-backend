const { response } = require("express");
const User = require("../models/User");

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "login",
        email,
        password,
    });
};

const createNewUser = async (req, res = response) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: "register",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please, talk with the admin",
        });
    }
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = { loginUser, createNewUser, renewToken };
