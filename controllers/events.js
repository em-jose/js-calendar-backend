const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate("user", "name");

    return res.json({
        ok: true,
        events: events,
    });
};

const getUserEvents = async (req, res = response) => {
    try {
        const userId = req.uid;

        if (!userId) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission to view this calendar",
            });
        }

        const events = await Event.find({ user: userId }).populate(
            "user",
            "name"
        );

        return res.json({
            ok: true,
            events: events,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Talk with the admin",
        });
    }
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        return res.json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Talk with the admin",
        });
    }
};

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "The ID does not exist",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission to edit this event",
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        return res.json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk with the admin",
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "The ID does not exist",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission to remove this event",
            });
        }

        const deletedUpdate = await Event.findByIdAndDelete(eventId);

        return res.json({
            ok: true,
            msg: "Event removed correctly",
            event: deletedUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk with the admin",
        });
    }
};

module.exports = {
    getEvents,
    getUserEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
