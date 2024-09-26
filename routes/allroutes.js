const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment"); // require


//GET Request
router.get("/", (req, res) => {
  //rusult ==> array of objects
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/search.html", (req, res) => {
  res.render("user/search", {});
});

router.get("/view/:id", (req, res) => {
  //rusult ==>  object
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { item: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});



//POST Request
router.post("/search", (req, res) => {
  console.log("========================================");
  searchText = req.body.searchtext.trim();
  User.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })

    .catch((err) => {
      console.log(err);
    });
});



// DELETE Request
router.delete("/edit/:id", (req, res) => {
  // User.findByIdAndDelete(req.params.id) or
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
    });
});



// UPDATE Request
router.put("/edit/:id", (req, res) => {
  // User.findByIdAndUpdate(req.params.id,req.body) or
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
