var mysql = require('mysql');

// var pool = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'tainnt',
//     password: '12345678',
//     database: 'battle_ship',
// });

var pool = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12270334',
    password: 'fbws2QvVig',
    database: 'sql12270334',
});

module.exports = {
    createTable: function() {
        var sql = "CREATE TABLE player (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , username varchar(20) not null, password varchar(10) not null)";
        pool.query(sql, function(err) {
            if (err) throw err;
            console.log('Create table successful');
        });
    },

    insertPlayer: function(name, pass) {
        var sql = "INSERT INTO player(username,password) VALUES (?,?)";
        pool.query(sql, [name, pass], function(err) {
            if (err)
                throw err;
            console.log('Insert successful');
        });
    },

    deletePlayer: function(name) {
        var sql = "DELETE FROM player WHERE username = ?";
        pool.query(sql, [name], function(err) {
            if (err)
                throw err;
            console.log('Delete successful');
        });
    },

    updatePlayer: function(name, pass) {
        var sql = "UPDATE player SET password = ? WHERE username = ?";
        pool.query(sql, [pass, name], function(err) {
            if (err)
                throw err;
            console.log('Update successful');
        });
    },

    findPlayer: function(name, callback) {
        var sql = "SELECT id FROM player WHERE username= ?";
        pool.query(sql, [name], function(err, result, fields) {
            if (err)
                throw err;
            if (result[0] == null) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    selectPlayer: function(name, pass, callback) {
        var sql = "SELECT id FROM player WHERE username= ? AND password= ?";
        pool.query(sql, [name, pass], function(err, result, fields) {
            if (err)
                throw err;
            if (result[0] == null) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },
};