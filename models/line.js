let Line = {

    getAllLines: async function (db, callback) {
        return await db.query("Select * from line", callback);
    },
    getLineById: function (db, id, callback) {
        return db.query("select * from line where id=?", [id], callback);
    },
    addLine: function (db, line, callback) {
        return db.query('INSERT INTO line (name) VALUES (?)', [line.name], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteLine: function (db, id, callback) {
        return db.query("DELETE FROM line where Id=?", [id], callback);
    },
    updateLine: function (db, line, callback) {
        return db.query('UPDATE line SET name = ? WHERE id = ?', [line.name, line.id], callback);
    },
};
module.exports = Line;