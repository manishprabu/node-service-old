// Basic Setup
var http = require('http'),
	app = require('./app');
let db = require('./dbconn');

app.post('/hyundai/login', function (req, res) {
	let con = db.getConnection();
	if (
		typeof req.body.username !== 'undefined' &&
		typeof req.body.password !== 'undefined'
	) {
		var username = req.body.username, password = req.body.password;
		con.query('SELECT service.user.id AS `id`,service.user.user_name AS `user_name`,service.user.user_id AS `user_id`,service.user.name AS `name`,service.user.phone AS `phone`,service.user.email AS `email`,service.role.id AS `role_id`,service.role.name AS `role_name`FROM user JOIN service.role on service.role.id = service.user.role_id where user_name = ? and password = ?', [username, password], function (err, rows, fields) {
			if (!err) {
				var response = [];
				res.setHeader('Content-Type', 'application/json');
				if (rows.length !== 0) {
					response.push({ 'status': 'success', 'message': 'login successful', 'data': rows });
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
		response.push({ 'result': 'error', 'msg': 'Please fill the required details' });
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

// Create server
http.createServer(app).listen(app.get('port'), function () {
	console.log('Server listening on port ' + app.get('port'));
});
