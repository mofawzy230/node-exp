const User = require("../models/customerSchema");
var moment = require("moment"); // require


const user_index_get = (req, res) => {
    //rusult ==> array of objects
    User.find()
      .then((result) => {
        res.render("index", { arr: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const user_edit_get = (req, res) => {
    User.findById(req.params.id)
      .then((result) => {
        res.render("user/edit", { item: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const user_search_get = (req, res) => {
    res.render("user/search", {});
  }

  const user_view_get = (req, res) => {
    //rusult ==>  object
    User.findById(req.params.id)
      .then((result) => {
        res.render("user/view", { item: result, moment: moment });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const user_search_post = (req, res) => {
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
  }

  const user_delete = (req, res) => {
    // User.findByIdAndDelete(req.params.id) or
    User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("/");
      })
  
      .catch((err) => {
        console.log(err);
      });
  }

  const user_put = (req, res) => {
    // User.findByIdAndUpdate(req.params.id,req.body) or
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/");
      })
  
      .catch((err) => {
        console.log(err);
      });
  }

const user_add_get = (req, res) => {
  res.render("user/add", {});
}

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
    });
}
  module.exports = {
    user_index_get,
    user_edit_get,
    user_view_get,
    user_search_get,
    user_search_post,
    user_delete,
    user_put,
    user_add_get,
    user_post
  };