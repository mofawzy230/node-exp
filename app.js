const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require('moment'); // require
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//GET Request

app.get("/", (req, res) => {
  //rusult ==> array of objects
  console.log("------------------------------------------")
  
  User.find()
    .then((result)=>{
      res.render("index", { arr: result,moment: moment })
    })
    .catch((err) => {
      console.log(err)
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
     .then((result)=>{
      res.render("user/edit",{item:result,moment: moment})
     })
     .catch((err) => {
       console.log(err)
     });
  
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search", {});
});

app.get("/view/:id", (req, res) => {
  //rusult ==>  object
   User.findById(req.params.id)
     .then((result)=>{
      res.render("user/view",{item:result,moment: moment})
     })
     .catch((err) => {
       console.log(err)
     });
     
 });




//POST Request
app.post("/user/add.html", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
    });
});




// DELETE Request
app.delete("/edit/:id",(req,res)=>{
  // User.findByIdAndDelete(req.params.id) or
  User.deleteOne({ _id: req.params.id })
  .then(() => {
    res.redirect("/");
  })

  .catch((err) => {
    console.log(err);
  });
})

mongoose
  .connect(
    "mongodb+srv://mofawzy:hgvplkhgvpdl@cluster0.yjqwz.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
      console.log(`https://github.com/mofawzy230/node-exp.git`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
