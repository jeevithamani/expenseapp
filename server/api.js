var express = require('express');
var router = express.Router();
require('./../config/config');

var {mongoose} = require('./db/mongoose');
var Expense = require('./models/expensetracker');

router.delete('/deleteexpense/:id', function(req, res, next) {
    var id = req.params.id;
    Expense.findByIdAndRemove(id).then(function(result, err) {
        if (err) throw err;
        Expense.find({}, function(err, data) {
            if (err) throw err;
            res.render('expense', {expenses: data});
        });
    }).catch(next);
});

router.get('/getexpenses', function(req, res, next) {
    Expense.find({}, function(err, data) {
        if (err) throw err;
        res.render('expense', {expenses: data});
    }).catch(next);
});

router.post('/addexpense', function(req, res, next) {
    var newexpense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date,
    });
    newexpense.save().then(function(result, err) {
        if (err) throw err;
        Expense.find({}, function(err, data) {
            if (err) throw err;
            res.render('expense', {expenses: data});
        });
    }).catch(next);
});

module.exports = router;