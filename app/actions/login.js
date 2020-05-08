var mysql = require('mysql');


class DatabaseManager {

    #pool;

    // Config for databases manage
    constructor() {
        this.#pool  = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'mydb'
        });
    }

    #getConnection = () => {
        return new Promise((resolve, reject) => {
            this.#pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }

    checkUser(login, password, callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT * FROM user WHERE user_login ='"+ login +"' AND user_password_hash = '" + password + "';";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })
    }
}

module.exports = new DatabaseManager(); // singltone object