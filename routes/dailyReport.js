var express = require('express');
var router = express.Router();
var dailyReport = require('../models/dailyReport');

// Daily report
router.get('/dailyreports', function (req, res) {
    dailyReport.getAllReports(function (err, rows) {
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

// Daily report
router.get('/:id', function (req, res) {
    var id = req.params.id;
    dailyReport.getDailyReportById(id, function (err, rows) {
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

router.post('/update/status', function (req, res) {
    var response = [];
    if (typeof req.body.id !== 'undefined' &&
        typeof req.body.status !== 'undefined') {
        dailyReport.updateReportStatus(req.body, function (err, result) {
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
    } else {
        response.push({ 'result': 'error', 'msg': 'Please fill required details' });
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/add', function (req, res) {
    var response = [];
    if (
        typeof req.body.createdDate !== 'undefined' &&
        typeof req.body.lineId !== 'undefined' &&
        typeof req.body.equipmentId !== 'undefined' &&
        typeof req.body.breakDownStart !== 'undefined' &&
        typeof req.body.breakDownFinish !== 'undefined' &&
        typeof req.body.machineDownStart !== 'undefined' &&
        typeof req.body.machineDownFinish !== 'undefined' &&
        typeof req.body.problem !== 'undefined' &&
        typeof req.body.reason !== 'undefined' &&
        typeof req.body.actionTaken !== 'undefined' &&
        typeof req.body.counterMessure !== 'undefined' &&
        typeof req.body.cmStatus !== 'undefined' &&
        typeof req.body.completedDate !== 'undefined' &&
        typeof req.body.charges !== 'undefined' &&
        typeof req.body.createdUserId !== 'undefined'
    ) {
        var createdDate = req.body.createdDate,
            shift = req.body.shift,
            lineId = req.body.lineId,
            equipmentId = req.body.equipmentId,
            breakDownStart = req.body.breakDownStart,
            breakDownFinish = req.body.breakDownFinish,
            machineDownStart = req.body.machineDownStart,
            machineDownStart = req.body.machineDownStart,
            machineDownFinish = req.body.machineDownFinish,
            problem = req.body.problem,
            reason = req.body.reason,
            actionTaken = req.body.actionTaken,
            counterMessure = req.body.counterMessure,
            cmStatus = req.body.cmStatus,
            completedDate = req.body.completedDate,
            charges = req.body.charges;
        userId = req.body.createdUserId;

        dailyReport.addReport(req.body, function (err, result) {
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
    } else {
        response.push({ 'result': 'error', 'msg': 'Please fill required details' });
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/edit', function (req, res) {
    var response = [];
    if (
        typeof req.body.id !== 'undefined' &&
        typeof req.body.createdDate !== 'undefined' &&
        typeof req.body.lineId !== 'undefined' &&
        typeof req.body.equipmentId !== 'undefined' &&
        typeof req.body.breakDownStart !== 'undefined' &&
        typeof req.body.breakDownFinish !== 'undefined' &&
        typeof req.body.machineDownStart !== 'undefined' &&
        typeof req.body.machineDownFinish !== 'undefined' &&
        typeof req.body.problem !== 'undefined' &&
        typeof req.body.reason !== 'undefined' &&
        typeof req.body.actionTaken !== 'undefined' &&
        typeof req.body.counterMessure !== 'undefined' &&
        typeof req.body.cmStatus !== 'undefined' &&
        typeof req.body.completedDate !== 'undefined' &&
        typeof req.body.charges !== 'undefined'
    ) {
        var id = req.body.id,
            createdDate = req.body.createdDate,
            lineId = req.body.lineId,
            equipmentId = req.body.equipmentId,
            breakDownStart = req.body.breakDownStart,
            breakDownFinish = req.body.breakDownFinish,
            machineDownStart = req.body.machineDownStart,
            machineDownStart = req.body.machineDownStart,
            machineDownFinish = req.body.machineDownFinish,
            problem = req.body.problem,
            reason = req.body.reason,
            actionTaken = req.body.actionTaken,
            counterMessure = req.body.counterMessure,
            cmStatus = req.body.cmStatus,
            completedDate = req.body.completedDate,
            charges = req.body.charges;

        dailyReport.updateReport(req.body, function (err, result) {
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
    } else {
        response.push({ 'result': 'error', 'msg': 'Please fill required details' });
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

module.exports = router;