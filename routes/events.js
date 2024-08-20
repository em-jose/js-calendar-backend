/* 
    Events route
    /api/events
*/
const { Router } = require("express");
const { jwtValidate } = require("../middlewares/jwt-validator");
const router = Router();
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/events");

// Apply JWT validation to all routes
router.use(jwtValidate);

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
