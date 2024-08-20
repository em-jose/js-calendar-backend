const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "The user not exists",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrect",
            });
        }

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Please, talk with the admin",
        });
    }
};

const createNewUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
                ok: false,
                msg: "The email already exists",
            });
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Please, talk with the admin",
        });
    }
};

const renewToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = { loginUser, createNewUser, renewToken };
