const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pathdir = require('path').join(__dirname, '/uploads')
const mongoose = require('mongoose');
const config = require ('./config/server');
const PORT = 3000;
const app = express();
const api = require('./routes/api');
mongoose.connect(config.mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Bazaga Ulandi');
})
.catch((err)=>{
    console.log('Xatolik', err);
});

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(cors());
app.use('/api',api);
app.use('/uploads', express.static(pathdir));``
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/', function(req, res){
    res.send("Hello Server");
});

app.listen(PORT, function () {
    console.log('Server running ' + PORT);
})

