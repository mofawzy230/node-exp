const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment"); // require
const useControllers =require("../controllers/useController")


//user_index_get  user any name, form render ,requst
//GET Request
router.get("/", useControllers.user_index_get);

router.get("/edit/:id", useControllers.user_edit_get);

router.get("/user/search.html", useControllers.user_search_get);

router.get("/view/:id", useControllers.user_view_get);



//POST Request
router.post("/search", useControllers.user_search_post);



// DELETE Request
router.delete("/edit/:id", useControllers.user_delete);



// UPDATE Request
router.put("/edit/:id", useControllers.user_put);

module.exports = router;
