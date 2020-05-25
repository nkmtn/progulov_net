var express = require('express');
var router = express.Router();
var path = require('path');

var actions = require(path.resolve('app/actions/login.js'));   // модуль работы с базой даннных

router.get('/', (req, res, next) =>{
    res.sendFile(path.resolve('public/login.html'));
});

/*
    function to make the simplest autorisation
    input: NONE
    output: NONE
 */

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

/*
    function to get main page
    input: NONE
    output: NONE
 */

router.get('/home', (req, res, next) =>{
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

/*
    function to get list of students for the groups
    input: group_id
    output: JSON {group_id, students:[{lastname...}]}
 */

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
    output: JSON {groups[{group_id, group_number, group_programe, group_description}]}
 */

router.get('/group/list', (req, res, next) => {
    actions.list_groups((result) => {
        if (result.groups.length > 0) {
            res.send(JSON.stringify(result));
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
        if (result.lecturers.length > 0) {
            res.send(JSON.stringify(result));
        }else {
            res.send('err select list of lecturers');
        }
    });
});

/*
    function to get all the subjects
    input: NONE
    output: JSON {subjects[{subject_id, subjects_name, subjects_programe}]}
 */

router.get('/subjects/list', (req, res, next) => {
    actions.list_subjects((result) => {
        if (result.subjects.length > 0) {
            res.send(JSON.stringify(result));
        }else {
            res.send('err select list of subjects');
        }
    });
});

/*
    function to get information about the user by id
    input: user_id
    output: {"user": {lastname, firstname...}}
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
    function to add information about a new user
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
        "group_id": "2"
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
    function to add information about a new subject
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

/*
    function to get all lessons for the group
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

router.get('/lessons/list', (req, res, next) => {
    actions.list_lessons_group(req.query.group_id,(result) => {
        if (result.dates.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error for add')
        }
    });
});

/*
    function to get information about the lesson
    input: lesson_id
    output: {lessons_info:[{lessons_id, lessons_date...}]}
*/

router.get('/lessons/get', (req, res, next) => {
    actions.get_lesson_attendance(req.query.lessons_id,(result) => {
        if (result.lesson_info.length > 0 && result.attendance.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from lesson/get')
        }
    });
});

/*
    function to make the student a headman
    input: user_id, group_id
    output: user_id
*/

router.get('/user/make-headman', (req, res, next) => {
    actions.make_user_headman(req.query.user_id, req.query.group_id ,(result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from lesson/get')
        }
    });
});

/*
    function to dismiss the headman
    input: group_id
    output: user_id
*/

router.get('/user/dismiss-headman', (req, res, next) => {
    var data = {
        groups:[{group_id: req.query.group_id}]
    }
    actions.dismiss_headman(data ,(result) => {
        if (result.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('an error from dismiss headman')
        }
    });
});

/*
    function to get attendance for the group (all time)
    input: group_id
    output: user_id
*/

router.get('/attendance/group', (req, res, next) => {
    actions.list_attendance_for_group(req.query.group_id ,(result) => {
        if (result.groups.length > 0) {
            res.send(JSON.stringify(result))
        } else {
            res.send('err get attendance')
        }
    });
});

module.exports = router;