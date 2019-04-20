let express = require('express');
let router = express.Router();
let Equipment = require('../models/equipment');

router.post('/equipments', function (req, res) {
	let lineId = '';
	if(typeof req.body.lineId !== ''){
		lineId = req.body.lineId
	}
	Equipment.getAllEquipment( lineId, function (err, rows) {
		if (!err) {
			let response = [];
			res.setHeader('Content-Type', 'application/json');
			console.log(JSON.stringify(rows))
			if (rows.length !== 0) {
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
	let response = [];

	if (
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined'
	) {
		Equipment.addEquipment( req.body, function (err, result) {
			let response = [];
			//console.log(req.body);
			if (!err) {
	
				if (result.affectedRows !== 0) {
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
	let response = [];
	if (
		typeof req.body.id !== 'undefined' &&
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined'
	) {
		Equipment.updateEquipment( req.body, function (err, result) {
			let response = [];
			//console.log(req.body);
			if (!err) {
	
				if (result.affectedRows !== 0) {
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
	let id = req.params.id;

	Equipment.deleteEquipment( id, function (err, result) {
		if (!err) {
            let response = [];

            if (result.affectedRows !== 0) {
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
