var db = require('../dbconn');

var ProcessReport = {
    updateReport: function (reports,status, callback) {
        var idList = reports.IdList;
        idList.forEach(id => {
            return db.query('UPDATE daily_report SET report_status = ? WHERE id = ?', [status, id], callback);
        });
    },
};
module.exports = ProcessReport;