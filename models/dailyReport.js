const db = require("../manageDb");

let DailyReport = {

    getAllReports: function (callback) {
        let query = 'SELECT daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_Date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id;';
        return db.executeQuery(query, callback);

    },
    getDailyReportById: function (id, date, status, callingBy, callback) {
        if (callingBy === "admin") {
            console.log("admin working");
            let query = "SELECT daily_report.report_status AS `status`, daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`, equipment.equipment_no AS `equipment_name` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_date ="+ `'${date}' and daily_report.report_status = ${status}`;
            return db.executeQuery(query, callback);
        } else {
            let query = "SELECT daily_report.report_status AS `status`, daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`, equipment.equipment_no AS `equipment_name` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_user_id =" + id + ` and daily_report.created_date = '${date}'`;
            return db.executeQuery(query, callback);
        }
    },
    getDailyReport: function (date, callback) {
        let query = 'SELECT daily_report.report_status AS `status`, daily_report.id AS `daily_report_id`,daily_report.shift AS `shift`, daily_report.created_date AS `daily_report_created_date`,daily_report.modified_date AS `daily_report_modified_date`,daily_report.line_id AS `line_id`,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_Date,daily_report.charges,daily_report.equipment_id AS `equipment_id`,line.name AS `line_name`,equipment.name As `equipment_name`,equipment.person_id As `equipment_person_id` FROM service.daily_report JOIN line on line.id = daily_report.line_id JOIN equipment on equipment.id = daily_report.equipment_id WHERE daily_report.created_user_id = ? and daily_report.created_date = ?;';
        return db.executeQuery(query, [date], callback);

    },
    updateReportStatus: function (report, callback) {
        let query = `UPDATE daily_report SET report_status = ${report.status} WHERE id = ${report.id}`;
        return db.executeQuery(query, callback);
    },

    updateReportStatusWithDate: function (date, status, idArray, params, callback) {
        let query = 'UPDATE daily_report SET report_status = ? WHERE created_date = ? and id In (' + params.join(',') + ');';
        console.log(idArray);
        return db.executeQuery(query, [status, date, idArray.join(',')], callback);
    },

    addReport: function (report, callback) {
        let query = `INSERT INTO daily_report (created_date,shift, line_id,equipment_id,break_down_start,break_down_finish,machine_down_start,machine_down_finish,problem,reason,action_taken,counter_messure,cm_status,completed_date,charges,created_user_id) VALUES ('${report.createdDate}','${report.shift}','${report.lineId}','${report.equipmentId}','${report.breakDownStart}','${report.breakDownFinish}','${report.machineDownStart}','${report.achineDownFinish}','${report.problem}','${report.reason}','${report.actionTaken}','${report.counterMessure}','${report.cmStatus}','${report.completedDate}','${report.charges}',${report.createdUserId})`;
        console.log(query);
        return db.executeQuery(query, callback);
    },
    deleteReport: function (id, callback) {
        let db = db.handleDisconnect();
        return db.executeQuery('DELETE FROM equipment WHERE id = ?', [id], callback);
    },
    updateReport: function (report, callback) {
        let query = `UPDATE daily_report SET shift = '${report.shift}', line_id = '${report.lineId}', equipment_id = ${report.equipmentId}, break_down_start = '${report.breakDownStart}', break_down_finish = '${report.breakDownFinish}', machine_down_start ='${report.machineDownStart}', machine_down_finish='${report.machineDownFinish}', problem = '${report.problem}', reason ='${report.reason}' ,action_taken ='${report.actionTaken}' ,counter_messure ='${report.counterMessure}' ,cm_status ='${report.cmStatus}' ,completed_date ='${report.completedDate}' ,charges = '${report.charges}' WHERE id = ${report.id}`;
        return db.executeQuery(query, callback);
    },
    getDailyReportsByDateAndStatus: function (date, status, callback) {
        let query = "SELECT daily_report.id, daily_report.created_date,daily_report.shift,daily_report.break_down_start,daily_report.break_down_finish,daily_report.machine_down_start,daily_report.machine_down_finish,daily_report.problem,daily_report.reason,daily_report.action_taken,daily_report.counter_messure,daily_report.cm_status,daily_report.completed_date,daily_report.charges,line.name AS `line`, equipment.equipment_no AS `equipment`, user.name AS `user` from service.daily_report JOIN service.line ON line.id = service.daily_report.line_id JOIN service.equipment ON equipment.id = service.daily_report.equipment_id JOIN service.user ON user.id = service.daily_report.created_user_id where report_status = "+ `${status} and created_date = '${date}'`;
        console.log(query);
        return db.executeQuery(query, callback);
    }
};
module.exports = DailyReport;