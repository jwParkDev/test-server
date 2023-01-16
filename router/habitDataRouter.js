const { getHabitData } = require("../controller/habitDataController");

const Router = require("express");
const router = Router();

router.get("/:page", getHabitData);

module.exports = router;
