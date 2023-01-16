const { getCategoryData } = require("../controller/getCategoryData");

const Router = require("express");
const router = Router();

router.get("/:categoryId/:page", getCategoryData);

module.exports = router;
