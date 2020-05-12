var express = require('express');
var router = express.Router();
var path = require('path');

var actions = require(path.resolve('app/actions/login.js'));   // модуль работы с базой даннных

router.get('/student/list', (req, res, next) =>{
    actions.list_students(req.query.group, (result) => {
        if (result.length > 0) {
            console.log(result);
        }else {
            res.send('Uncorrect user id');
        }
        res.end();
    });
    // res.sendFile(path.resolve('public/login.html'));
    console.log('main users-controller page');
    console.log(res);
});