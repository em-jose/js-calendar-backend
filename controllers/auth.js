const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

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

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
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
            return res.status(400).json({
                ok: false,
                msg: "The email already exists",
            });
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Please, talk with the admin",
        });
    }
};

const renewToken = async (req, res = response) => {
    const { uid, name } = req;

    // Generate JWT
    const token = await generateJWT(uid, name);

    return res.json({
        ok: true,
        token: token,
    });
};

module.exports = { loginUser, createNewUser, renewToken };
