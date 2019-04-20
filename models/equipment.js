const db = require("../manageDb");

let Equipment = {

    getAllEquipment: async function (lineId, callback) {
        let query = '';
        if (lineId !== '') {
            query = 'SELECT equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,line.name AS `line_name` FROM service.equipment JOIN line on line.id = equipment.line_id where equipment.line_id = ?';
            return await db.executeQuery(query, [lineId], callback);
        } else {
            query = 'SELECT equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,line.name AS `line_name` FROM service.equipment JOIN line on line.id = equipment.line_id';
            return await db.executeQuery(query, callback);
        }
    },
    addEquipment: async function (equipment, callback) {

        return await db.executeQuery(`INSERT INTO equipment (equipment_no,line_id) VALUES ('${equipment.equipmentNo}',${equipment.lineId})`, callback);
        //return db.executeQuery("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteEquipment: async function (id, callback) {

        return await db.executeQuery(`DELETE FROM equipment WHERE id = ${id}`, callback);
    },
    updateEquipment: async function (equipment, callback) {

        return await db.executeQuery(`UPDATE equipment SET equipment_no= '${equipment.equipmentNo}', line_id = ${equipment.lineId} WHERE id = ${equipment.id}`, callback);
    },
};
module.exports = Equipment;