var db = require('../dbconn');

var Person = {

    getAllPersons: function (callback) {

        return db.query("Select * from person", callback);

    },
    getPersonById: function (id, callback) {

        return db.query("select * from person where id=?", [id], callback);
    },
    addPerson: function (person, callback) {
        return db.query('INSERT INTO person (name, planner_id, team) VALUES (?,?,?)', [person.name, person.plannerId, person.team], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deletePerson: function (id, callback) {
        return db.query("DELETE FROM person where id=?", [id], callback);
    },
    updatePerson: function (person, callback) {
        return db.query('UPDATE person SET name = ?, planner_id= ?, team = ? WHERE id = ?', [person.name, person.plannerId, person.team, person.id], callback);
    },
};
module.exports = Person;