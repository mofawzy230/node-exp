const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment"); // require
const useControllers =require("../controllers/useController")


router.get("", useControllers.user_add_get);


router.post("", useControllers.user_post);


module.exports = router;