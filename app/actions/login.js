var mysql = require('mysql');

/*
 Way to convert date to DATETIME
 */

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + '-' + twoDigits(1 + this.getUTCMonth()) + '-' + twoDigits(this.getUTCDate()) +
        ' ' + twoDigits(this.getUTCHours()) + ':' + twoDigits(this.getUTCMinutes()) + ':' +
        twoDigits(this.getUTCSeconds()) + '.123';
};

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
            var sql = "SELECT user.user_id, user.user_lastname, user.user_firstname, user.user_patronymic FROM user, user_has_role\n" +
		"WHERE user_has_role.group_id = '" + group_id +
		"' AND user_has_role.user_id = user.user_id ;";
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
            var sql = "SELECT user.user_id, user.user_lastname, user.user_firstname, user.user_patronymic FROM user, user_has_role, role\n" +
		"WHERE user_has_role.user_id = user.user_id AND\n" +
		"user_has_role.role_id = role.role_id;";
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
            var sql = "SELECT * FROM `group`;";
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
            var sql = "SELECT * FROM attendance, lessons, `group` WHERE " +
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
    
    user_add(user_info, callback){
        this.#getConnection().then((conn) => {
            var sql = "insert into user (user_firstname, user_lastname, user_patronymic, user_login, user_password_hash) "
                + "values ('" + user_info.firstname + "', '" + user_info.lastname + "' ,'" + user_info.patronymic + "','"
                + user_info.login + "','" + user_info.password + "');";

            conn.query(sql, (err, results, fields) => {
                var theDateTime = new Date();
                if (err) throw err;
                var sql = "insert into user_has_role (role_id, group_id, user_id, uhr_granted) values ("
                    + user_info.role + ", " + user_info.group_id + ", " + results.insertId
                    + ", '" + theDateTime.toMysqlFormat() + "');"
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    callback(results.insertId);
                    conn.release();
                });
            });
        })
    }
    
    user_get(user_id, callback){
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

    add_subject(subject_info){
        this.#getConnection().then((conn) => {
            console.log(subject_info)
            var sql = "insert into subjects (subjects_name, subjects_programe) " +
            "values ('" + subject_info.name + "', '" + subject_info.programe + "');";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                    conn.release();
            });
        })
    }

    // сделать старостой
    // если староста в группе уже назначет, он упразняется
    // должна быть соответствующая роль в таблице role
    make_user_headman(user_id, group_id, callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT group_id FROM user_has_role WHERE role_id=" +
                "(SELECT role.role_id FROM role WHERE role.role_code = " + 3 + ")" +" AND group_id=" + group_id + ";";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                if (results.length > 0)
                    var data = {
                        groups:[]
                    }
                    for(var j = 0; j < results.length; j++){
                        data.groups.push(Object.assign({}, results[j]))
                    }
                    this.dismiss_headman(data, (results) =>{
                        if(results.length < 0){
                            callback(NULL);
                            conn.release();
                        }
                    })
                var theDateTime = new Date();
                sql = "INSERT INTO user_has_role" + "(user_id, role_id, group_id, uhr_granted) values (" +
                    user_id + " , (SELECT role.role_id FROM role WHERE role.role_code = " + 3 + "), " + group_id + ", '" +
                    theDateTime.toMysqlFormat()+ "');";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    callback(user_id);
                    conn.release();
                });
            });
        })
    }

    // упроздняет старосту в группе
    dismiss_headman(data, callback){
        this.#getConnection().then((conn) => {
            var theDateTime = new Date();
            var sql = "UPDATE user_has_role SET uhr_revoked='"+ theDateTime.toMysqlFormat() +
                "' WHERE group_id IN( " ;
            console.log(data, data.groups.length, data.groups[0].group_id)
            for(var i = 0; i < data.groups.length; i++)
                sql += data.groups[i].group_id + ", ";
            sql += "-1" + ") AND role_id = (SELECT role.role_id FROM role WHERE role.role_code = 3);";
            console.log(sql)
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(1);
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

    list_lessons_group(group_id, callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT lessons.lessons_id, lessons.lessons_date, lessons.user_id, user.user_lastname, "
		+ "user.user_firstname, user.user_patronymic, lessons.subjects_id, subjects.subjects_name "
		+ "FROM lessons, user, subjects GROUP BY DAY(lessons.lessons_date) "
	        + "HAVING lessons.subjects_id=subjects.subjects_id AND "
		+ "lessons.user_id=user.user_id AND lessons.group_id=" + group_id + ";";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                callback(results);
                conn.release();
            });
        })
    }

    get_lesson_attendance(lessons_id, callback){
        this.#getConnection().then((conn) => {
            var sql = "SELECT lessons.lessons_id, lessons.lessons_date, lessons.user_id, user.user_lastname, "
            + "user.user_firstname, user.user_patronymic, subjects.subjects_id, subjects.subjects_name "
            + "FROM lessons, user, subjects WHERE lessons.subjects_id=subjects.subjects_id AND "
            + "lessons.user_id=user.user_id AND lessons.lessons_id=" + lessons_id + ";";
            conn.query(sql, (err, results, fields) => {
                if (err) throw err;
                var data ={
                    lesson_info: [],
                    attendance: []
                };
                for(var j = 0; j < results.length; j++){
                    data.lesson_info.push(Object.assign({}, results[j]))
                }
                sql = "SELECT attendance.user_id, user.user_lastname, user.user_firstname, user.user_patronymic, " +
                    "attendance.presence FROM attendance, user WHERE attendance.user_id=user.user_id AND " +
                    "attendance.lessons_id=" + lessons_id + ";";
                conn.query(sql, (err, results, fields) => {
                    if (err) throw err;
                    for(var j = 0; j < results.length; j++){
                        data.attendance.push(Object.assign({}, results[j]))
                    }
                    console.log(data);
                    callback(data);
                    conn.release();
                });
            });
        })
    }
	
}

module.exports = new DatabaseManager(); // singltone object
