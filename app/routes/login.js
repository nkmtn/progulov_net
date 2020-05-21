var express = require('express');
var router = express.Router();
var path = require('path');

var actions = require(path.resolve('app/actions/login.js'));   // модуль работы с базой даннных

router.get('/', (req, res, next) =>{
    res.sendFile(path.resolve('public/login.html'));
});

router.post('/auth', (req, res, next) =>{
    var login = req.body.username;
    var password = req.body.password;
    if (login && password) {
        actions.checkUser(req.body.username, req.body.password, (result) => {
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = login;
                res.redirect('/home');
            }else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});


router.get('/home', (req, res, next) =>{
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});


router.get('/student/list', (req, res, next) =>{
    actions.list_students(req.query.group, (result) => {
        if (result.length > 0) {
            let data = {
                group_id: req.query.group,
                students: []
            };
            for(var j = 0; j < result.length; j++){
                data.students.push(Object.assign({}, result[j]))
            }
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }else {
            res.send('Uncorrect user id');
        }
        res.end();
    });
    // res.sendFile(path.resolve('public/login.html'));
    console.log('main users-controller page');
});

/*
    function to get all the groups
    input: NONE
    output: JSON {groups[{group_id, group_title, group_programe, group_description}]}
 */

router.get('/group/list', (req, res, next) => {
    actions.list_groups((result) => {
        if (result.length > 0) {
            let data = {
                groups: []
            };
            for(var j = 0; j < result.length; j++){
                data.groups.push(Object.assign({}, result[j]))
            }
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }else {
            res.send('err select list of groups');
        }
    });
});

/*
    function to get all the lecturers
    input: NONE
    output: JSON {lecturers[{user_id, user_lastname, user_firstname, user_patronymic}]}
 */

router.get('/lecturer/list', (req, res, next) => {
    actions.list_teachers((result) => {
        if (result.length > 0) {
            let data = {
                lecturers: []
            };
            for(var j = 0; j < result.length; j++){
                data.lecturers.push(Object.assign({}, result[j]))
            }
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }else {
            res.send('err select list of lecturers');
        }
    });
});

/*
    function to get all the subjects
    input: NONE
    output: JSON {subjects[{subject_id, subject_name, group_programe}]}
 */

router.get('/subjects/list', (req, res, next) => {
    actions.list_subjects((result) => {
        if (result.length > 0) {
            let data = {
                subjects: []
            };
            for(var j = 0; j < result.length; j++){
                data.subjects.push(Object.assign({}, result[j]))
            }
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }else {
            res.send('err select list of subjects');
        }
    });
});

/*
    function to get the one user by id
    input: user_id
    output: {"user": {firstname...}}
 */

router.get('/user/get', (req, res, next) => {
    actions.user_get(req.query.user_id , (result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result));
        }else {
            res.send('err select list of subjects');
        }
    });
});

/*
    function to get all the subjects
    input: NONE
    output: JSON {subjects[{subject_id, subject_name, group_programe}]}
 */

router.get('/attendance/group', (req, res, next) => {
    actions.list_attendance_group(req.query.group_id,(result) => {
        if (result.length > 0) {
            let data = {
                attendance: []
            };
            for(var j = 0; j < result.length; j++){
                data.attendance.push(Object.assign({}, result[j]))
            }
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }else {
            res.send('err select list of subjects');
        }
    });
});

/*
    input: JSON(example below)
    output: confirm message

    test body:
    {
    "user": {
        "firstname": "Иван",
        "lastname": "Иванов",
        "patronymic": "Иванович",
        "role": 1,
        "login": "1721000",
        "password": "potom zashefryu",
        "group": "22300"
    }
    }
 */

router.post('/student/add', (req, res, next) => {
    actions.user_add(req.body.user,(result) => {
        if (result.length > 0) {
            res.send('add the user')
        } else {
            res.send('an error for add')
        }
    });
});

/*
    input: JSON(example below)
    output: confirm message

    test body:
    {
    "subject": {
        "name": "Введение в тестирование",
        "programe": "09.00.00"
    }
    }
 */

router.post('/subject/add', (req, res, next) => {
    actions.add_subject(req.body.subject,(result) => {
        if (result.length > 0) {
            res.send('add the user')
        } else {
            res.send('an error for add')
        }
    });
});

router.get('/lessons/list', (req, res, next) => {
    actions.list_lessons_group(req.query.group_id,(result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error for add')
        }
    });
});

router.get('/lessons/get', (req, res, next) => {
    actions.get_lesson_attendance(req.query.lessons_id,(result) => {
        if (result.lesson_info.length > 0 && result.attendance.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from lesson/get')
        }
    });
});

router.get('/user/make-headman', (req, res, next) => {
    actions.make_user_headman(req.query.user_id, req.query.group_id ,(result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from lesson/get')
        }
    });
});

router.get('/user/dismiss-headman', (req, res, next) => {
    actions.dismiss_headman(req.query.user_id, req.query.group_id ,(result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from lesson/get')
        }
    });
});

module.exports = router;