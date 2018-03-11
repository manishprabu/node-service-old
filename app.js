express  = require('express'),
parser   = require('body-parser');
var cors = require('cors')

// Setup express
var app = express();
app.use(parser.json());
app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);

// Add headers
app.use(function (req, res, next) {	

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

module.exports = app;