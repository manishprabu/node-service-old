var express = require('express');
var router = express.Router();
var Equipment = require('../models/equipment');


router.get('/equipments', function (req, res) {
	Equipment.getAllEquipment(function (err, rows) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				response.push({ 'status': 'success', 'data': rows });
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

router.post('/add', function (req, res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' &&
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined' &&
		typeof req.body.personId !== 'undefined'
	) {
		Equipment.addEquipment(req.body, function (err, result) {
			var response = [];
			//console.log(req.body);
			if (!err) {
	
				if (result.affectedRows != 0) {
					response.push({ 'status': 'success' });
				} else {
					response.push({ 'status': 'failure' });
				}
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(response);
			} else {
				res.status(400).send(err);
			}
		});

	} else {
		response.push({ 'result': 'error', 'msg': 'Please fill required details' });
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(JSON.stringify(response));
	}
});


router.post('/edit', function (req, res) {
	var response = [];
	if (
		typeof req.body.id !== 'undefined' &&
		typeof req.body.name !== 'undefined' &&
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined' &&
		typeof req.body.personId !== 'undefined'
	) {
		Equipment.updateEquipment(req.body, function (err, result) {
			var response = [];
			//console.log(req.body);
			if (!err) {
	
				if (result.affectedRows != 0) {
					response.push({ 'status': 'success' });
				} else {
					response.push({ 'status': 'failure' });
				}
	
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(response);
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

router.delete('/delete/:id', function (req, res) {
	var id = req.params.id;

	Equipment.deleteEquipment(id, function (err, result) {
		if (!err) {
            var response = [];

            if (result.affectedRows != 0) {
                response.push({ 'status': 'success' });
            } else {
                response.push({ 'status': 'failure' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(response);
        } else {
            res.status(400).send(err);
        }
	});
});

module.exports = router;
