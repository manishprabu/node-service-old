const db = require("../manageDb");

let Line = {

    getAllLines: async function (callback) {
        return await db.executeQuery("Select * from line", callback);
    },
    getLineById: async function (id, callback) {
        return await db.executeQuery(`select * from line where id=${id}`, callback);
    },
    addLine: async function (line, callback) {
        console.log(line.name);
        return await db.executeQuery(`INSERT INTO line (name) VALUES ('${line.name}')`, callback);
    },
    deleteLine: async function (id, callback) {
        return await db.executeQuery(`DELETE FROM line where Id=${id}`, callback);
    },
    updateLine: async function (line, callback) {
        return await db.executeQuery(`UPDATE line SET name = '${line.name}' WHERE id = ${line.id}`, callback);
    },
};
module.exports = Line;