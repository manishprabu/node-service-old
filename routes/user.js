var express = require('express');
var router = express.Router();
var User = require('../models/user');
router.get('/users', function (req, res) {
	User.getAllUsers(function (err, rows) {
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
    User.addUser(req.body, function (err, result) {
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
    User.updateUser(req.body, function (err, result) {
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

router.post('/registerUser', function (req, res) {
    User.registerAsNewUser(req.body, function (err, result) {
        var response = [];
        console.log(req.body);
        if (!err) {
            if (result.affectedRows != 0) {
                response.push({ 'status': 'success', 'message' : "Used added successfully" });
            } else {
                response.push({ 'status': 'failure', 'message' : "Given employee id not found" });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});

router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    User.deleteUser(id, function(err,result){
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
