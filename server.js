const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pathdir = require('path').join('_dirname', '/uploads');

const PORT = 3000;
const app = express();
const api = require('./routes/api')

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(pathdir));
app.use('/api',api);

app.get('/', function(req,res){
    res.send("Hello Server");
});

app.listen(PORT, function () {
    console.log('Server running ' + PORT);
})

