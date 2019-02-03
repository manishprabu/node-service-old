let DailyReport = {

    getAllReports: function (db, callback) {
        let query = 'SELECT daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_Date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`,equipment.name As `equipment_name`,equipment.person_id As `equipment_person_id` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id;';
        return db.query(query, callback);

    },
    getDailyReportById: function (db, id, date, status, callingBy, callback) {
        if (callingBy === "admin") {
            console.log("admin working");
            let query = 'SELECT daily_report.report_status AS `status`, daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`, equipment.equipment_no AS `equipment_name` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_date = ? and daily_report.report_status = ?';
            return db.query(query, [date, status], callback);
        } else {
            let query = 'SELECT daily_report.report_status AS `status`, daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`, equipment.equipment_no AS `equipment_name` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_user_id = ? and daily_report.created_date = ?;';
            return db.query(query, [id, date], callback);
        }
    },
    getDailyReport: function (db, date, callback) {
        let query = 'SELECT daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_Date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`,equipment.name As `equipment_name`,equipment.person_id As `equipment_person_id` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_user_id = ? and daily_report.created_date = ?;';
        return db.query(query, [date], callback);

    },
    updateReportStatus: function (db, report, callback) {
        let query = 'UPDATE daily_report SET report_status = ? WHERE id = ?';
        return db.query(query, [report.status, report.id], callback);
    },

    updateReportStatusWithDate: function (db, date, status, idArray, params, callback) {
        let query = 'UPDATE daily_report SET report_status = ? WHERE created_date = ? and id In (' + params.join(',') + ');';
        console.log(idArray);
        return db.query(query, [status, date, idArray.join(',')], callback);
    },

    addReport: function (db, report, callback) {
        let query = 'INSERT INTO daily_report (created_date,shift, line_id,equipment_id,break_down_start,break_down_finish,machine_down_start,machine_down_finish,problem,reason,action_taken,counter_messure,cm_status,completed_date,charges,created_user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        return db.query(query, [report.createdDate, report.shift, report.lineId, report.equipmentId, report.breakDownStart, report.breakDownFinish, report.machineDownStart, report.machineDownFinish, report.problem, report.reason, report.actionTaken, report.counterMessure, report.cmStatus, report.completedDate, report.charges, report.createdUserId], callback);
    },
    deleteReport: function (id, callback) {
        let db = db.handleDisconnect();
        return db.query('DELETE FROM equipment WHERE id = ?', [id], callback);
    },
    updateReport: function (db, report, callback) {
        let query = 'UPDATE daily_report SET shift = ?, line_id = ?, equipment_id = ?, break_down_start = ?, break_down_finish = ?, machine_down_start =?, machine_down_finish=?, problem = ?, reason =? ,action_taken =? ,counter_messure =? ,cm_status =? ,completed_date =? ,charges = ? WHERE id = ?';
        return db.query(query, [report.shift, report.lineId, report.equipmentId, report.breakDownStart, report.breakDownFinish, report.machineDownStart, report.machineDownFinish, report.problem, report.reason, report.actionTaken, report.counterMessure, report.cmStatus, report.completedDate, report.charges, report.id], callback);
    },
    getDailyReportsByDateAndStatus: function (db, date, status, callback) {
        let query = 'SELECT daily_report.id, daily_report.created_date,daily_report.shift,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,line.name AS `line`, equipment.equipment_no AS `equipment`, user.name AS `user` from service.daily_report JOIN service.line ON line.id = service.daily_report.line_id JOIN service.equipment ON equipment.id = service.daily_report.equipment_id JOIN service.user ON user.id = service.daily_report.created_user_id where report_status = ? and created_date = ?';
        return db.query(query, [status, date], callback);
    }
};
module.exports = DailyReport;