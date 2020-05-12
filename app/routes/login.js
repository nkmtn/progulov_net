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

module.exports = router;