var db = require('../dbconn');

var Line = {

    getAllLines: function (callback) {

        return db.query("Select * from line", callback);

    },
    getLineById: function (id, callback) {

        return db.query("select * from line where id=?", [id], callback);
    },
    addLine: function (line, callback) {
        return db.query('INSERT INTO line (name) VALUES (?)', [line.name], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteLine: function (id, callback) {
        return db.query("DELETE FROM line where Id=?", [id], callback);
    },
    updateLine: function (line, callback) {
        return db.query('UPDATE line SET name = ? WHERE id = ?', [line.name, line.id], callback);
    },
};
module.exports = Line;