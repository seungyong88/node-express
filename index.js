const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://root:root@cluster0.b7cyh.mongodb.net/test?authSource=admin&replicaSet=atlas-qc8jb8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true').then(() => console.log('mongodb connected...')).catch(port, ()=> {console.log(error)});
mongoose.connect(config.mongoURI).then(() => console.log('mongodb connected...')).catch(port, () => { console.log(error) });

// application/ x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 형태 
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/api/hello', (req, res) => {
  res.send("hello");
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    })

  })
})


app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인한다.
    // console.log("req.body.password", req.body.password);
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
      }

      // 비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 쿠키,  로컬스토리지
        // console.log("user.token", user.token);
        res.cookie("x_auth", user.token).status(200).send({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
 // 여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
  res.send(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, {token: ""}, (err, user) => {
    if(err) return res.json({ success: false, err });

    return res.status(200).send({
      success: true,
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})