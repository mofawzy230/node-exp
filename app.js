const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataschema")
app.set('view engine','ejs')

//احضار البيانات وعرضها فى ملف home

mongoose
.connect("mongodb+srv://mofawzy:hgvplkhgvpdl@cluster0.yjqwz.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
.then( ()=>{
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)   
        console.log(`https://github.com/mofawzy230/node-exp-level3`)
    })
})
.catch((err)=>{console.log(err)});

reloadhome()





// حفظ البيانات و ارسال رسالة تفيد  بارسال البيانات  بنجاح
app.post('/', (req, res) => {
  console.log(req.body)

  const mydata = new Mydata(req.body);

  mydata.save()
  .then (()=>{
    res.redirect("/index.html")
  }) 
  .catch((err)=>{
    console.log(err)

  })
})

app.get('/index.html', (req, res) => {
  res.send("<h1>تم ارسال البيانات بنجاح</h1>")
})

reloadhome()
function reloadhome(){
  app.get('/', (req, res) => {

    Mydata.find()
    .then((result)=>{
      res.render("home",{mytitle:"home page",arr:result})
    })
    .catch((err)=>{console.log(err)})
    
  })
  
}
