const express = require('express');
const app = express();
const port = 3000;


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.b7cyh.mongodb.net/test?authSource=admin&replicaSet=atlas-qc8jb8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world'));

app.listen(port, () => console.log('run'));