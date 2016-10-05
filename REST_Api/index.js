var express = require('express');
var morgan = require('morgan');
var app = express();

var cors = require('cors');
app.use(cors());
app.options('*', cors());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods',    'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    if (req.method == 'OPTIONS') {
        res.status(200);
        res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
        res.end();
    } else {
        next();
    }
});

app.use(morgan('dev'));
var port = process.env.PORT || 3000;

var router = express.Router();

require('./routes/routes')(app,router);
app.use('/api',router);
app.listen(port);
console.log('Server Started at' + port);