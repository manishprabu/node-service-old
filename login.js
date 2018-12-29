app  = require('./app');

app.post('/hyundai/login', function (req,res) { 
	if (
	    typeof req.body.username !== 'undefined' && 
		typeof req.body.password !== 'undefined'	
	) {
		var username = req.body.username, password = req.body.password;
 
		connection.query('SELECT * from user where user_name = ? and password = ?', [username, password], function(err, rows, fields) {
            if (!err){
                var response = [];
              res.setHeader('Content-Type', 'application/json');
              if (rows.length !== 0) {
                  response.push({'status' : 'success', 'message' : 'login successful', 'data' : JSON.stringify(rows)});
                  res.status(200).send(response);
              } else {
                  response.push({'result' : 'error', 'msg' : 'Invalid username or password'});
                  res.status(200).send(JSON.stringify(response));
              } 			
            } else {
              res.status(400).send(err);
            }
      });
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});