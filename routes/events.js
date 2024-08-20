/* 
    Events route
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { fieldValidate } = require("../middlewares/field-validator");
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

router.post(
    "/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("start", "Starting date is required").custom(isDate),
        check("end", "Ending date is required").custom(isDate),
        fieldValidate,
    ],
    createEvent
);

router.put(
    "/:id",
    [
        check("title", "Title is required").not().isEmpty(),
        check("start", "Starting date is required").custom(isDate),
        check("end", "Ending date is required").custom(isDate),
        fieldValidate,
    ],
    updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
