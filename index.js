const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require("./models/User");
//
app.use(bodyParser.urlencoded({extends: true}));

//
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://root:root@cluster0.b7cyh.mongodb.net/test?authSource=admin&replicaSet=atlas-qc8jb8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

app.post('/register', (req, res) => {
  // 회원가입에 필요한 정보를 client에서 가져오면
  // 그것들은 DB에 넣어준다
  var user = new User();
  console.log("d");

  user.save((err, doc) => {
    if(err) return res.json({ success: false, err: err});
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => console.log('run'));