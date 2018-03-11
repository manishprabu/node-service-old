// Basic Setup
var http = require('http'),
	connection = require('./dbconn');
app = require('./app');


app.post('/hyundai/login', function (req, res) {
	if (
		typeof req.body.username !== 'undefined' &&
		typeof req.body.password !== 'undefined'
	) {
		var username = req.body.username, password = req.body.password;

		connection.query('SELECT * from user where user_name = ? and password = ?', [username, password], function (err, rows, fields) {
			if (!err) {
				var response = [];
				res.setHeader('Content-Type', 'application/json');
				if (rows.length != 0) {
					response.push({ 'status': 'success', 'message': 'login successful', 'data': JSON.stringify(rows) });
					res.status(200).send(response);
				} else {
					response.push({ 'status': 'failure', 'message': 'Invalid username or password' });
					res.status(200).send(JSON.stringify(response));
				}
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

// Set default route
app.get('/user', function (req, res) {
	connection.query('SELECT * from user', function (err, rows, fields) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				res.status(200).send(JSON.stringify(rows));
			} else {
				//response.push({'msg' : 'No Result Found'});//
				res.status(200).send(JSON.stringify({ 'msg': 'No Result Found' }));
			}

		} else {
			res.status(400).send(err);
		}
	});
});


// Endpoint: http://127.0.0.1:5000/employee/add
app.post('/user/add', function (req, res) {
	var response = [];

	if (
		typeof req.body.code !== 'undefined' &&
		typeof req.body.name !== 'undefined' &&
		typeof req.body.gender !== 'undefined' &&
		typeof req.body.department !== 'undefined'
	) {
		var code = req.body.code, name = req.body.name, gender = req.body.gender, department = req.body.department;

		connection.query('INSERT INTO employee (code, name, gender, department) VALUES (?, ?, ?, ?)',
			[code, name, gender, department],
			function (err, result) {
				if (!err) {

					if (result.affectedRows != 0) {
						response.push({ 'result': 'success' });
					} else {
						response.push({ 'msg': 'No Result Found' });
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
		res.status(200).send(JSON.stringify(response));
	}
});

// Endpoint: http://127.0.0.1:5000/employee/{:employee id}
app.get('/user/:id', function (req, res) {
	var id = req.params.id;
	connection.query('SELECT * from employee where id = ?', [id], function (err, rows, fields) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				res.status(200).send(JSON.stringify(rows));
			} else {
				response.push({ 'result': 'error', 'msg': 'No Results Found' });
				res.status(200).send(JSON.stringify(response));
			}
		} else {
			res.status(400).send(err);
		}
	});
});

// Endpoint: http://127.0.0.1:5000/employee/edit/{:employee id}
app.post('/user/edit/:id', function (req, res) {
	var id = req.params.id, response = [];

	if (
		typeof req.body.code !== 'undefined' &&
		typeof req.body.name !== 'undefined' &&
		typeof req.body.gender !== 'undefined' &&
		typeof req.body.department !== 'undefined'
	) {
		var code = req.body.code, name = req.body.name, gender = req.body.gender, department = req.body.department;

		connection.query('UPDATE employee SET name = ?, gender = ?, department = ? WHERE code = ?',
			[name, gender, department, code],
			function (err, result) {
				if (!err) {

					if (result.affectedRows != 0) {
						response.push({ 'result': 'success' });
					} else {
						response.push({ 'msg': 'No Result Found' });
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


app.delete('/user/delete/:id', function (req, res) {
	var id = req.params.id;

	connection.query('DELETE FROM employee WHERE code = ?', [id], function (err, result) {
		if (!err) {
			var response = [];

			if (result.affectedRows != 0) {
				response.push({ 'result': 'success' });
			} else {
				response.push({ 'msg': 'No Result Found' });
			}

			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(response));
		} else {
			res.status(400).send(err);
		}
	});
});


// Line

app.get('/lines', function (req, res) {
	connection.query('SELECT * from line', function (err, rows, fields) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				response.push({ 'status': 'success', 'data': JSON.stringify(rows) })
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

app.post('/line/add', function (req, res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined'
	) {
		var name = req.body.name;

		connection.query('INSERT INTO line (name) VALUES (?)',
			[name],
			function (err, result) {
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
		res.status(200).send(JSON.stringify(response));
	}
});


app.post('/line/edit', function (req, res) {
	response = [];

	if (
		typeof req.body.id !== 'undefined' &&
		typeof req.body.name !== 'undefined'
	) {
		var id = req.body.id,name = req.body.name;

		connection.query('UPDATE line SET name = ? WHERE id = ?',
			[name, id],
			function (err, result) {
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

app.delete('/line/delete/:id', function (req, res) {
	var id = req.params.id;

	connection.query('DELETE FROM line WHERE id = ?', [id], function (err, result) {
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


// Person

app.get('/person', function (req, res) {
	connection.query('SELECT * from person', function (err, rows, fields) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				response.push({ 'status': 'success', 'data': JSON.stringify(rows) })
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

app.post('/person/add', function (req, res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' &&
		typeof req.body.plannerId !== 'undefined' &&
		typeof req.body.team !== 'undefined'
	) {
		var name = req.body.name, plannerId = req.body.plannerId, team = req.body.team;

		connection.query('INSERT INTO person (name,planner_id,team) VALUES (?,?,?)',
			[name, plannerId, team],
			function (err, result) {
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
		res.status(200).send(JSON.stringify(response));
	}
});


app.post('/person/edit', function (req, res) {
	var response = [];
	if (
		typeof req.body.id !== 'undefined' &&
		typeof req.body.name !== 'undefined' &&
		typeof req.body.plannerId !== 'undefined' &&
		typeof req.body.team !== 'undefined'
	) {
		var id = req.body.id,name = req.body.name, plannerId = req.body.plannerId, team = req.body.team;

		connection.query('UPDATE person SET name = ?, planner_id= ?, team = ? WHERE id = ?',
			[name, plannerId, team, id],
			function (err, result) {
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
			connection.on('error', function(err) {
				console.log("[mysql error]",err);
			  });

	} else {
		response.push({ 'result': 'error', 'msg': 'Please fill required details' });
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(response));
	}
});

app.delete('/person/delete/:id', function (req, res) {
	var id = req.params.id;

	connection.query('DELETE FROM person WHERE id = ?', [id], function (err, result) {
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


// Equipment

app.get('/equipments', function (req, res) {
	var query = 'SELECT equipment.name AS `equipment_name`, equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,equipment.person_id AS `person_id`,line.name AS `line_name`,person.name As `person_name`,person.planner_id As `planner_id`,person.team As `team`FROM service.equipment JOIN line on line.id = equipment.line_id JOIN person on person.id = equipment.person_id';
	connection.query(query, function (err, rows, fields) {
		if (!err) {
			var response = [];
			res.setHeader('Content-Type', 'application/json');
			if (rows.length != 0) {
				response.push({ 'status': 'success', 'data': JSON.stringify(rows) })
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

// app.get('/equipment/:id', function (req, res) {
// 	var id = req.params.id,
// 		response = [];
// 	var name = req.body.name, equipmentNo = req.body.equipmentNo, lineId = req.body.lineId, personId = req.body.personId;
// 	var query = 'SELECT equipment.id AS `id`, equipment.name AS `equipment_name`, equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,equipment.person_id AS `person_id`,line.name AS `line_name`,person.name As `person_name`,person.planner_id As `planner_id`,person.team As `team`FROM service.equipment JOIN line on line.id = equipment.line_id JOIN person on person.id = equipment.person_id where equipment.id= ?';

// 	connection.query(query, [id],
// 		function (err, rows, fields) {
// 			if (!err) {

// 				var response = [];
// 				res.setHeader('Content-Type', 'application/json');
// 				if (rows.length != 0) {
// 					response.push({ 'status': 'success', 'data': JSON.stringify(rows) })
// 					res.status(200).send(response);
// 				} else {
// 					//response.push({'msg' : 'No Result Found'});//
// 					res.status(200).send(JSON.stringify({ 'status': 'failure', 'message': 'No Result Found' }));
// 				}
// 			} else {
// 				res.status(400).send(err);
// 			}
// 		});
// });

app.post('/equipment/add', function (req, res) {
	var response = [];

	if (
		typeof req.body.name !== 'undefined' &&
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined' &&
		typeof req.body.personId !== 'undefined'
	) {
		var name = req.body.name, equipmentNo = req.body.equipmentNo, lineId = req.body.lineId, personId = req.body.personId;

		connection.query('INSERT INTO equipment (name,equipment_no,line_id,person_id) VALUES (?,?,?,?)',
			[name, equipmentNo, lineId, personId],
			function (err, result) {
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
		res.status(200).send(JSON.stringify(response));
	}
});


app.post('/equipment/edit/', function (req, res) {

	if (
		typeof req.body.id !== 'undefined' &&
		typeof req.body.name !== 'undefined' &&
		typeof req.body.equipmentNo !== 'undefined' &&
		typeof req.body.lineId !== 'undefined' &&
		typeof req.body.personId !== 'undefined'
	) {
		var id=req.body.id, name = req.body.name, equipmentNo = req.body.equipmentNo, lineId = req.body.lineId, personId = req.body.personId;

		connection.query('UPDATE equipment SET name = ?, equipment_no= ?, line_id = ?, person_id = ? WHERE id = ?',
			[name, equipmentNo, lineId, personId, id],
			function (err, result) {
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

app.delete('/equipment/delete/:id', function (req, res) {
	var id = req.params.id;

	connection.query('DELETE FROM equipment WHERE id = ?', [id], function (err, result) {
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


// Create server
http.createServer(app).listen(app.get('port'), function () {
	console.log('Server listening on port ' + app.get('port'));
});
