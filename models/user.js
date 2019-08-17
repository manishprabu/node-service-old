const db = require("../manageDb");

let User = {

    getAllUsers: function (callback) {
        return db.executeQuery("SELECT service.user.id AS `id`, service.user.user_name AS `user_name`, service.user.password AS `password`, service.user.user_id AS `user_id`, service.user.name AS `name`, service.user.phone AS `phone`, service.user.email AS `email`, service.role.id AS `role_id`, service.role.name AS `role_name` FROM user  JOIN service.role on service.role.id = service.user.role_id", callback);
    },
    getUserById: function (id, callback) {
        return db.executeQuery("SELECT * FROM user where id=?", [id], callback);
    },
    addUser: function (user, callback) {
        let query = `INSERT INTO user (user_name, password, name, user_id, role_id, phone, email) VALUES ('','','${user.name}', '${user.userId}','${user.roleId}', '${user.phone}', '${user.email}')`;
        console.log("insert query" + query);
        return db.executeQuery(query, callback);
        //return db.exceuteQuery("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteUser: function (id, callback) {
        return db.executeQuery(`DELETE FROM user where id=${id}`, callback);
    },
    updateUser: function (user, callback) {
        let query = `UPDATE user SET name = '${user.name}', user_id='${user.userId}', user_name='${user.userName}', password='${user.password}', role_id= '${user.roleId}', phone = '${user.phone}', email='${user.email}' WHERE id = ${user.id}`;
        console.log("update query" + query);
        return db.executeQuery(query, callback);
    },
    registerAsNewUser: function (user, callback) {
        return db.executeQuery(`UPDATE user SET user_name='${user.userName}', password='${user.password}' WHERE user_id = '${user.userId}'`, callback);
    }
};
module.exports = User;