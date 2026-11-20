const { Router } = require("express");
const router = Router();

router.use("/breakfast", require("../modules/breakfast/breakfast.routes"));
router.use("/lunch", require("../modules/lunch/lunch.routes"));
router.use("/dinner", require("../modules/dinner/dinner.routes"));

module.exports = router;
