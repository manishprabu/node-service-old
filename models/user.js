const db = require("../manageDb");

let User = {

    getAllUsers: function (callback) {
        return db.executeQuery("SELECT service.user.id AS `id`, service.user.user_name AS `user_name`, service.user.password AS `password`, service.user.user_id AS `user_id`, service.user.name AS `name`, service.user.phone AS `phone`, service.user.email AS `email`, service.role.id AS `role_id`, service.role.name AS `role_name` FROM user  JOIN service.role on service.role.id = service.user.role_id", callback);
    },
    getUserById: function (id, callback) {
        return db.executeQuery("SELECT * FROM user where id=?", [id], callback);
    },
    addUser: function (user, callback) {
        return db.executeQuery('INSERT INTO user (name, user_id, role_id, phone, email) VALUES (?, ?,?,?,?)', [user.name, user.userId, user.roleId, user.phone, user.email], callback);
        //return db.exceuteQuery("insert into task(Id,Title,Status) values(?,?,?)",[Task1.Id,Task1.Title,Task1.Status],callback);
    },
    deleteUser: function (id, callback) {
        return db.executeQuery("DELETE FROM user where id=?", [id], callback);
    },
    updateUser: function (user, callback) {
        return db.executeQuery('UPDATE user SET name = ?, user_id=?, user_name=?, password=?, role_id= ?, phone = ?, email=? WHERE id = ?', [user.name, user.user_id, user.user_name, user.password, user.role_id, user.phone, user.email, user.id], callback);
    },
    registerAsNewUser: function (user, callback) {
        return db.executeQuery('UPDATE user SET user_name=?, password=? WHERE user_id = ?', [user.user_name, user.password, user.user_id], callback);
    }
};
module.exports = User;