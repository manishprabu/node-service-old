// Basic Setup
var http = require('http'),
	app = require('./app');
let db = require('./dbconn');

app.post('/hyundai/login', function (req, res) {
	if (
		typeof req.body.user_name !== 'undefined' &&
		typeof req.body.password !== 'undefined'
	) {
		var userId = req.body.user_name, password = req.body.password;
		db.query('SELECT service.user.id AS `id`,service.user.user_name AS `user_name`,service.user.user_id AS `user_id`,service.user.name AS `name`,service.user.phone AS `phone`,service.user.email AS `email`,service.role.id AS `role_id`,service.role.name AS `role_name`FROM user JOIN service.role on service.role.id = service.user.role_id where user_id = ? and password = ?', [userId, password], function (err, rows, fields) {
			if (!err) {
				var response = [];
				res.setHeader('Content-Type', 'application/json');
				if (rows.length !== 0) {
					response.push({ 'status': 'success', 'message': 'login successful', 'data': rows });
					console.log("service" + response);
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

// Create server
http.createServer(app).listen(app.get('port'), function () {
	console.log('Server listening on port ' + app.get('port'));
});
