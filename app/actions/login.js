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

    list_students(group_id, callback){

        this.#getConnection().then((conn) => {
            var sql = "SELECT user.user_id FROM user, user_has_role, group\n" +
		"WHERE group.group_id = " + group_id +
		" AND group.group_id = user_has_role.group_id AND user_has_role.user_id = user.user_id ;";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })

    }

    list_groups(callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT * FROM group;";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })

    }

    list_teachers(callback){

        this.#getConnection().then((conn) => {
            var sql = "SELECT user.user_id FROM user, user_has_role, role\n" +
		"WHERE role.role_code = " + 2 +
		" AND role.role_id = user_has_role.role_id AND user_has_role.user_id = user.user_id ;";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })

    }	

    list_subjects(callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT * FROM subjects;";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })	
    }

    list_attendance(callback){
	this.#getConnection().then((conn) => {
            var sql = "SELECT * FROM attendance;";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })	
    }
    
    list_attendance_group(group_id, callback){
	this.#getConnection().then((conn) => {
            var sql = "SELECT * FROM attendance, lessons, group WHERE " +
		"attendance.lessons_id = lessons.lessons_id AND lessons.group_id = group.group_id AND " +
		"group.group_id = " + group_id + ";";
            conn.query(sql, (err, result, fields) => {
                    if (err) throw err;
                        callback(result);
                    console.log("select: ok");
                    conn.release();
                });
        })	
    }
    
    user_add(firstname, secondname, patronymic, role, login, password, group){
	this.#getConnection().then((conn) => {
	    var sql = "insert into user (user_firstname, user_secondname, user_patronymic, user_login, user_password_hash) " +
		"values ('" + firstname + "'," + secondname + ",'" + patronymic + "','" + login + "','" + password + "');";
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
		if (err) throw err;
		console.log(result.insertId);
		var user_id = result.insertId;
		var sql = "insert into user_has_role (role_id, group_id, user_id) values (" + role + ", " + group + ", " + user_id + ");"
		conn.query(sql, (err, results, fields) => {
		    if (err) throw err;
                    conn.release();
		});
	    
            
	    });
	})
    }
    
    user_get(callback, user_id){
	this.#getConnection().then((conn) => {
            var sql = "select * from user where user_id='" + user_id + "';";
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                callback(results);
                conn.release();
            });
	})
    }
    
    user_hide(user_id){
	this.#getConnection().then((conn) => {
            var sql = "delete from spiceinfo where user_id=" + user_id + ";";
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	})
    }

    add_subject(name, programe){
	
	this.#getConnection().then((conn) => {
	    var sql = "insert into subjects (subjects_name, subjects_programe) " +
		"values ('" + name + "', '" + programe + "');";
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    
	})
    }

    // сделать старостой
    // должна быть соответствующая роль в таблице role
    make_user_headman(user_id, group_id){
	
	this.#getConnection().then((conn) => {
	    var sql = "INSERT INTO user_has_role\n" +
		"(user_id, role_id, group_id) values (" + user_id + ", (SELECT role.role_id FROM role WHERE role.role_code = " + 3 + ", + " + group_id + ");"; 
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    
	})

    }

    // упроздняет всех старост в группе
    dismiss_headmans(group_id){

	this.#getConnection().then((conn) => {
	    var sql = "DELETE FROM user_has_role\n" +
		"WHERE group_id = " + group_id +
		", role_id = (SELECT role.role_id FROM role WHERE role.role_code = 3);"; 
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    
	})
    }
    

    add_lesson(subjects_id, group_id, teacher_id, date){
	
	this.#getConnection().then((conn) => {
	    var sql = "insert into lessons (lessons_date, subjects_id, group_id, user_id) " +
		"values (" + date + ", " + subjects_id + ", " + group_id + ", " + teacher_id + ");";
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    
	})
    }
    
    // упроздняет всех старост в группе
    delete_lesson(lesson_id){

	this.#getConnection().then((conn) => {
	    var sql = "DELETE FROM lessons\n" +
		"WHERE lessons_id = " + lessons_id + ";"; 
            conn.query(sql, (err, results, fields) => {
		if (err) throw err;
                conn.release();
            });
	    
	})
    }
	
}

module.exports = new DatabaseManager(); // singltone object
