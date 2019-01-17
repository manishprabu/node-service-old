var express = require('express');
var router = express.Router();
var User = require('../models/user');
var db = require('../dbconn');

router.get('/users', function (req, res) {
    let con = db.getConnection();
	User.getAllUsers(con, function (err, rows) {
        if (!err) {
            var response = [];
            res.setHeader('Content-Type', 'application/json');
            if (rows.length != 0) {
                response.push({ 'status': 'success', 'data': rows })
                res.status(200).send(response);
            } else {
                response.push({ 'status': 'failure', 'message': 'No Result Found' });//
                res.status(200).send(response);
            }
        } else {
            res.status(400).send(err);
        }
    });
});

router.post('/add', function (req, res, next) {
    let con = db.getConnection();
    User.addUser(con, req.body, function (err, result) {
        var response = [];
        //console.log(req.body);
        if (!err) {

            if (result.affectedRows != 0) {
                response.push({ 'status': 'success' });
            } else {
                response.push({ 'status': 'failure' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});

router.post('/edit', function (req, res) {
    let con = db.getConnection();
    User.updateUser(con, req.body, function (err, result) {
        var response = [];
        //console.log(req.body);
        if (!err) {

            if (result.affectedRows != 0) {
                response.push({ 'status': 'success' });
            } else {
                response.push({ 'status': 'failure' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});

router.delete('/delete/:id', function (req, res) {
    let con = db.getConnection();
    var id = req.params.id;
    User.deleteUser(con, id, function(err,result){
        if (!err) {
            var response = [];

            if (result.affectedRows != 0) {
                response.push({ 'status': 'success' });
            } else {
                response.push({ 'status': 'failure' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});

module.exports = router;
