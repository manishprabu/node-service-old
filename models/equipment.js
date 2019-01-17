let Equipment = {

    getAllEquipment: function (db,lineId, callback) {
        let query = '';
        if(lineId !== ''){
            query = 'SELECT equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,line.name AS `line_name` FROM service.equipment JOIN line on line.id = equipment.line_id where equipment.line_id = ?';
            return db.query(query,[lineId], callback);
        }else{
            query = 'SELECT equipment.id AS `equipment_id`,equipment.equipment_no AS `equipment_no`,equipment.line_id AS `line_id`,line.name AS `line_name` FROM service.equipment JOIN line on line.id = equipment.line_id';
            return db.query(query, callback);
        }
    },
    addEquipment: function (db, equipment, callback) {

        return db.query('INSERT INTO equipment (equipment_no,line_id) VALUES (?,?)', [equipment.equipmentNo, equipment.lineId], callback);
        //return db.query("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteEquipment: function (db, id, callback) {

        return db.query('DELETE FROM equipment WHERE id = ?', [id], callback);
    },
    updateEquipment: function (db, equipment, callback) {

        return db.query('UPDATE equipment SET equipment_no= ?, line_id = ? WHERE id = ?', [equipment.equipmentNo, equipment.lineId, equipment.id], callback);
    },
};
module.exports = Equipment;