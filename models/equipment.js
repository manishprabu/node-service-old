var db = require('../dbconn');

var Equipment = {

    getAllEquipment: function (callback) {
        var query = 'SELECT equipment.name AS `equipment_name`, equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,equipment.person_id AS `person_id`,line.name AS `line_name`,person.name As `person_name`,person.planner_id As `planner_id`,person.team As `team`FROM service.equipment JOIN line on line.id = equipment.line_id JOIN person on person.id = equipment.person_id';

        return db.query(query, callback);

    },
    addEquipment: function (equipment, callback) {
        return db.query('INSERT INTO equipment (name,equipment_no,line_id,person_id) VALUES (?,?,?,?)', [equipment.name, equipment.equipmentNo, equipment.lineId,equipment.personId], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteEquipment: function (id, callback) {
        return db.query('DELETE FROM equipment WHERE id = ?', [id], callback);
    },
    updateEquipment: function (equipment, callback) {
        return db.query('UPDATE equipment SET name = ?, equipment_no= ?, line_id = ?, person_id = ? WHERE id = ?', [equipment.name, equipment.equipmentNo, equipment.lineId,equipment.personId, equipment.id], callback);
    },
};
module.exports = Equipment;