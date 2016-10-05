var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
var port = process.env.PORT || 3000;

var router = express.Router();

require('./routes/routes')(app,router);
app.use('/api',router);
app.listen(port);
console.log('Server Started at' + port);