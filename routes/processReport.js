var express = require('express');
var router = express.Router();
var Line = require('../models/ProcessReport');

router.get('/', function (req, res, next) {

    Line.getAllLines(function (err, rows) {
        if (!err) {
            var response = [];
            res.setHeader('Content-Type', 'application/json');
            if (rows.length != 0) {
                response.push({ 'status': 'success', 'data': rows })
                res.status(200).send(response);
            } else {
                //response.push({'msg' : 'No Result Found'});//
                res.status(200).send(JSON.stringify({ 'status': 'failure', 'message': 'No Result Found' }));
            }
        } else {
            res.status(400).send(err);
        }
    });
});

module.exports = router;
