const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://root:root@cluster0.b7cyh.mongodb.net/test?authSource=admin&replicaSet=atlas-qc8jb8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true').then(() => console.log('mongodb connected...')).catch(port, ()=> {console.log(error)});
mongoose.connect(config.mongoURI).then(() => console.log('mongodb connected...')).catch(port, ()=> {console.log(error)});

// application/ x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));

// application/json 형태 
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  const user = new User(req.body); 
  
  user.save((err , userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    })

  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})